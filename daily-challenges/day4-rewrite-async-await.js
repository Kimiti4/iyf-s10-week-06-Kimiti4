// Day 4: Rewrite with Async/Await 🟡
// Take any callback-based code you wrote before and rewrite it using async/await.

// Original callback-based version (from lesson 11)
function loadUserCallback(userId, callback) {
    setTimeout(() => {
        const users = {
            1: { id: 1, name: "Alice", email: "alice@example.com" },
            2: { id: 2, name: "Bob", email: "bob@example.com" },
            3: { id: 3, name: "Charlie", email: "charlie@example.com" }
        };
        const user = users[userId] || null;
        callback(user);
    }, 1500);
}

// Rewritten with async/await
function loadUserAsync(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const users = {
                1: { id: 1, name: "Alice", email: "alice@example.com" },
                2: { id: 2, name: "Bob", email: "bob@example.com" },
                3: { id: 3, name: "Charlie", email: "charlie@example.com" }
            };
            const user = users[userId] || null;
            resolve(user);
        }, 1500);
    });
}

// Usage comparison
console.log("=== Callback Version ===");
loadUserCallback(1, (user) => {
    console.log("Loaded:", user);
});

console.log("\n=== Async/Await Version ===");
async function demonstrateAsyncAwait() {
    const user = await loadUserAsync(1);
    console.log("Loaded:", user);
}

demonstrateAsyncAwait();
