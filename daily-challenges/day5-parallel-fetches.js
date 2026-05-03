// Day 5: Parallel Fetches 🟡
// Fetch data from 3 different API endpoints simultaneously.
// Display results as each one completes (use Promise.allSettled).

async function fetchFromMultipleEndpoints() {
    const endpoints = [
        { name: "Users", url: "https://jsonplaceholder.typicode.com/users/1" },
        { name: "Posts", url: "https://jsonplaceholder.typicode.com/posts/1" },
        { name: "Comments", url: "https://jsonplaceholder.typicode.com/comments/1" }
    ];

    console.log("Starting parallel fetches...\n");

    // Create all fetch promises
    const promises = endpoints.map(async (endpoint) => {
        try {
            const response = await fetch(endpoint.url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const data = await response.json();
            return {
                status: "fulfilled",
                endpoint: endpoint.name,
                value: data
            };
        } catch (error) {
            return {
                status: "rejected",
                endpoint: endpoint.name,
                reason: error.message
            };
        }
    });

    // Wait for all to complete
    const results = await Promise.allSettled(promises);

    // Display results as they complete
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            const data = result.value;
            console.log(`✅ ${data.endpoint}:`, data.value);
        } else {
            console.log(`❌ ${endpoints[index].name} failed:`, result.reason);
        }
    });
}

fetchFromMultipleEndpoints();
