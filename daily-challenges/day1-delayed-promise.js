// Day 1: Delayed Promise 🟢
// Create a function delay(ms) that returns a promise that resolves after ms milliseconds

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

// Usage example
async function testDelay() {
    console.log("Start");
    await delay(2000);
    console.log("This prints after 2 seconds");
}

testDelay();

module.exports = delay;
