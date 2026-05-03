//11.1 exercise 1
console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");

//  Output Order: A, C, E, B, D
// Explanation:
// - Synchronous code runs first: A, C, E
// - setTimeout with 0ms goes to macro task queue → B runs after sync code
// - setTimeout with 100ms → D runs after B (even if B finishes fast)

//11.1 exercise 2
//  Simulated loadUser function with callback
function loadUser(userId, callback) {
    setTimeout(() => {
        // Simulate database lookup
        const users = {
            1: { id: 1, name: "Alice", email: "alice@example.com" },
            2: { id: 2, name: "Bob", email: "bob@example.com" },
            3: { id: 3, name: "Charlie", email: "charlie@example.com" }
        };
        
        const user = users[userId] || null;
        callback(user);
    }, 1500);
}

//  Usage example:
loadUser(1, function(user) {
    if (user) {
        console.log(" User loaded:", user);
    } else {
        console.log("❌ User not found");
    }
});

//11.2 exercise 1
// ⚠️ This is the "Pyramid of Doom" - hard to read & maintain
getUserData(1, function(user) {
    console.log("User:", user);
    getUserPosts(user.id, function(posts) {
        console.log("Posts:", posts);
        getPostComments(posts[0].id, function(comments) {
            console.log("Comments:", comments);
            // More nesting... 
        });
    });
});


//exercise 2
//  Promise-based getUserData
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "John", email: "john@example.com" });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

//  Promise-based getUserPosts
function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve([
                    { id: 1, title: "Post 1", userId },
                    { id: 2, title: "Post 2", userId }
                ]);
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

// Promise-based getPostComments
function getPostComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (postId > 0) {
                resolve([
                    { id: 1, text: "Great post!", postId },
                    { id: 2, text: "Thanks for sharing", postId }
                ]);
            } else {
                reject("Invalid post ID");
            }
        }, 1000);
    });
}

// Test the promises
getUserData(1)
    .then(user => {
        console.log("👤 User:", user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log("📝 Posts:", posts);
        return getPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("💬 Comments:", comments);
    })
    .catch(error => {
        console.error("❌ Error:", error);
    });

    //11.3 exercise 1
    //  Clean promise chaining with error handling
function fetchUserDataFlow(userId) {
    return getUserData(userId)
        .then(user => {
            console.log("👤 User:", user);
            return getUserPosts(user.id);
        })
        .then(posts => {
            console.log("📝 Posts:", posts);
            if (posts.length === 0) throw new Error("No posts found");
            return getPostComments(posts[0].id);
        })
        .then(comments => {
            console.log("💬 Comments:", comments);
            return getUserData(userId).then(user => ({ user, posts, comments }));
        })
        .catch(error => {
            console.error("🚨 Chain failed:", error);
            throw error; // Re-throw for upstream handling
        });
}

//exercise 2
// Fetch multiple users in parallel
async function fetchMultipleUsers(userIds) {
    const promises = userIds.map(id => getUserData(id));
    
    try {
        const users = await Promise.all(promises);
        console.log("✅ All users loaded:", users);
        return users;
    } catch (error) {
        console.error("❌ One or more failed:", error);
        return [];
    }
}

//  Usage:
fetchMultipleUsers([1, 2, 3]);

//exercise 3
//  Race between multiple data sources (e.g., CDN fallback)
function fetchWithFallback(primaryUrl, fallbackUrl) {
    const primary = fetch(primaryUrl).then(res => res.json());
    const fallback = fetch(fallbackUrl).then(res => res.json());
    
    return Promise.race([primary, fallback])
        .then(data => ({ source: "primary", data }))
        .catch(() => {
            // If primary fails, wait for fallback
            return fallback.then(data => ({ source: "fallback", data }));
        });
}

//11.4 exercise 1
// ✅ Clean async/await version
async function getDataWithAsync(userId = 1) {
    const user = await getUserData(userId);
    console.log("👤 User:", user);
    
    const posts = await getUserPosts(user.id);
    console.log("📝 Posts:", posts);
    
    const comments = await getPostComments(posts[0].id);
    console.log("💬 Comments:", comments);
    
    return { user, posts, comments };
}

// ✅ Usage options:
// Option 1: With .then()
getDataWithAsync().then(result => console.log("✅ Complete:", result));

// Option 2: Inside another async function
async function main() {
    try {
        const result = await getDataWithAsync();
        console.log("🎉 Final result:", result);
    } catch (error) {
        console.error("💥 Main error:", error);
    }
}
main();

//exercise 2
// ✅ Robust error handling pattern
async function fetchUserData(userId) {
    try {
        const user = await getUserData(userId);
        const posts = await getUserPosts(user.id);
        
        return { 
            success: true, 
            data: { user, posts },
            timestamp: new Date().toISOString()
        };
        
    } catch (error) {
        console.error("🚨 Failed to fetch:", error);
        
        return { 
            success: false, 
            error: error.message || "Unknown error",
            userId 
        };
    }
}

//exercise 3
// ✅ Sequential vs Parallel comparison
async function getAllUsersComparison() {
    console.time("sequential");
    // ❌ Sequential (slow - ~3 seconds)
    const seq1 = await getUserData(1);
    const seq2 = await getUserData(2);
    const seq3 = await getUserData(3);
    console.timeEnd("sequential");
    
    console.time("parallel");
    // ✅ Parallel (fast - ~1 second)
    const [par1, par2, par3] = await Promise.all([
        getUserData(1),
        getUserData(2),
        getUserData(3)
    ]);
    console.timeEnd("parallel");
    
    return [par1, par2, par3];
}

//ewrite Callback Hell with Async/Await
// ✅ The same nested logic - but CLEAN!
async function fetchUserFlow(userId) {
    try {
        const user = await getUserData(userId);
        console.log("👤 User:", user);
        
        const posts = await getUserPosts(user.id);
        console.log("📝 Posts:", posts);
        
        if (posts.length === 0) {
            console.log("⚠️ No posts to fetch comments for");
            return { user, posts, comments: [] };
        }
        
        const comments = await getPostComments(posts[0].id);
        console.log("💬 Comments:", comments);
        
        return { user, posts, comments };
        
    } catch (error) {
        console.error("💥 Flow failed:", error);
        throw error;
    }
}

// ✅ Usage:
fetchUserFlow(1)
    .then(result => console.log("🎉 Success:", result))
    .catch(err => console.log("❌ Handled at top level:", err));


    