# 03. Why a Promise Runs Before setTimeout(0)

**Watch the Short:** https://www.youtube.com/shorts/mQD_s2jrCt0  
**Run the example:** `node lessons/03-promise-microtasks/demo.mjs`

## Runnable example

```javascript
console.log('start');
setTimeout(() => console.log('timer'), 0);
Promise.resolve().then(() => console.log('promise'));
console.log('end');
```

## Expected output

```text
start
end
promise
timer
```

## What is happening?

The synchronous logs happen first: `start`, then `end`. A `.then` handler attached to an already-fulfilled Promise is queued as a **microtask**. The timer callback is a later **task**. The runtime drains the relevant microtask queue at its checkpoint before processing the timer task, so `promise` prints before `timer` in this example.

This result is about the concrete code shown, not a rule that every Promise always beats every timer in all possible circumstances.

## Common misconceptions

- Calling `.then` does not execute its callback synchronously.
- `setTimeout(..., 0)` is not a promise/microtask.
- Do not claim that all asynchronous work uses a single queue.

## Try it yourself

Run the example first, then change one value or statement and **predict** the output before running it again. Keep each experiment in your own copy of the file; the repository tests assume the original examples.

[Back to lesson index](../../README.md#lessons)
