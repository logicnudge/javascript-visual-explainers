# 07. Does await Freeze JavaScript?

**Watch the Short:** https://www.youtube.com/shorts/RtcGbRTGS_w  
**Run the example:** `node lessons/07-async-await/demo.mjs`

## Runnable example

```javascript
console.log('A');

async function runTask() {
 console.log('B');
 await Promise.resolve();
 console.log('C');
}

runTask();
console.log('D');
```

## Expected output

```text
A
B
D
C
```

## What is happening?

Calling the async function begins executing its body immediately, so `B` appears before `D`. At `await Promise.resolve()`, the async function **suspends** and its remaining code is scheduled to resume asynchronously (as a microtask). The caller continues synchronously and prints `D`, and the function later prints `C`.

`await` pauses the *current async function's execution*, not the entire JavaScript runtime. In a browser, a long-running synchronous task can still block rendering; `await` is not an automatic fix for CPU-heavy code.

## Common misconceptions

- An async function can execute synchronously until its first `await`.
- `await` does not freeze all JavaScript.
- `await` does not automatically move CPU-intensive work onto another thread.

## Try it yourself

Run the example first, then change one value or statement and **predict** the output before running it again. Keep each experiment in your own copy of the file; the repository tests assume the original examples.

[Back to lesson index](../../README.md#lessons)
