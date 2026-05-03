// Day 3: Error Handling 🟡
// Create a function that fetches a user. If the user doesn't exist (404),
// return a default user object instead of throwing an error.

const DEFAULT_USER = {
    id: 0,
    name: "Anonymous User",
    email: "anonymous@example.com",
    username: "anonymous",
    phone: "N/A",
    website: "N/A",
    company: {
        name: "Unknown Company"
    },
    address: {
        city: "Unknown City",
        street: "Unknown Street"
    }
};

async function fetchUserWithFallback(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`User ${userId} not found. Returning default user.`);
                return DEFAULT_USER;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const user = await response.json();
        return user;
        
    } catch (error) {
        console.error("Network error occurred:", error.message);
        return DEFAULT_USER;
    }
}

// Test with valid and invalid user IDs
async function testErrorHandling() {
    console.log("Fetching user 1 (should exist):");
    const user1 = await fetchUserWithFallback(1);
    console.log(user1.name);
    
    console.log("\nFetching user 999 (should use fallback):");
    const user999 = await fetchUserWithFallback(999);
    console.log(user999.name);
}

testErrorHandling();
