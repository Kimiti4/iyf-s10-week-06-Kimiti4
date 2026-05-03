// Day 2: Promise Chain 🟢
// Create 3 functions that each return a promise after a random delay.
// Chain them together and time how long the total execution takes.

function step1() {
    const delay = Math.random() * 1000 + 500; // 500-1500ms
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Step 1 completed");
            resolve("result1");
        }, delay);
    });
}

function step2() {
    const delay = Math.random() * 1000 + 500;
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Step 2 completed");
            resolve("result2");
        }, delay);
    });
}

function step3() {
    const delay = Math.random() * 1000 + 500;
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Step 3 completed");
            resolve("result3");
        }, delay);
    });
}

// Chain them and measure time
async function runChain() {
    console.time("Total Execution Time");
    
    await step1();
    await step2();
    await step3();
    
    console.timeEnd("Total Execution Time");
}

runChain();
