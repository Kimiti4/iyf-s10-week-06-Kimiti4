# Daily Challenges - Week 6: Asynchronous JavaScript

This folder contains solutions to the daily challenges from work.txt (lines 630-659).

## Challenges Completed

### Day 1: Delayed Promise 🟢
**File:** `day1-delayed-promise.js`

Created a `delay(ms)` function that returns a promise resolving after the specified milliseconds.

**Key Concept:** Understanding Promise creation and setTimeout integration.

---

### Day 2: Promise Chain 🟢
**File:** `day2-promise-chain.js`

Created 3 functions returning promises with random delays, chained them sequentially, and measured total execution time.

**Key Concepts:** 
- Promise chaining
- Performance measurement with `console.time()`
- Sequential async operations

---

### Day 3: Error Handling 🟡
**File:** `day3-error-handling.js`

Built a robust user fetching function that gracefully handles 404 errors by returning a default user object instead of throwing.

**Key Concepts:**
- Try/catch with async/await
- Graceful degradation
- Fallback patterns

---

### Day 4: Rewrite with Async/Await 🟡
**File:** `day4-rewrite-async-await.js`

Converted callback-based code from Lesson 11 into clean async/await syntax.

**Key Concepts:**
- Callback to Promise conversion
- Async/await syntax benefits
- Code readability improvements

---

### Day 5: Parallel Fetches 🟡
**File:** `day5-parallel-fetches.js`

Fetched data from 3 different API endpoints simultaneously using `Promise.allSettled()` to handle both successes and failures.

**Key Concepts:**
- `Promise.allSettled()` vs `Promise.all()`
- Parallel vs sequential execution
- Handling partial failures

---

## How to Run

Each challenge file can be run independently in a browser console or Node.js environment:

```javascript
// Copy and paste into browser console
// Or run with Node.js (for day3 and day5 which use fetch)
node day1-delayed-promise.js
node day2-promise-chain.js
node day3-error-handling.js
node day4-rewrite-async-await.js
node day5-parallel-fetches.js
```

## Learning Outcomes

By completing these challenges, you've mastered:
- ✅ Creating and consuming Promises
- ✅ Chaining async operations
- ✅ Robust error handling patterns
- ✅ Converting callbacks to async/await
- ✅ Parallel async operations with proper error handling
