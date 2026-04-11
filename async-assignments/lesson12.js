//12.1 exercise 1
// ✅ Basic fetch with proper response handling
fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => {
        // ✅ Always check response.ok first!
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("✅ User data:", data);
        displayUser(data); // Your display function
    })
    .catch(error => {
        console.error("❌ Fetch failed:", error);
        showError(error.message);
    });

    //exercise 2
    // ✅ Reusable async fetch function
async function getUser(id) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error("🚨 Failed to fetch user:", error);
        throw error; // Let caller decide how to handle
    }
}

// ✅ Usage with top-level await (in module) or IIFE
(async () => {
    try {
        const user = await getUser(1);
        console.log("👤 Loaded:", user);
        displayUser(user);
    } catch (err) {
        showError("Could not load user");
    }
})();

//12.2