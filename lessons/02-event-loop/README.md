# 02. Why JavaScript Prints 1, 3, 2

**Watch the Short:** https://www.youtube.com/shorts/7a7VNG8n54g  
**Run the example:** `node lessons/02-event-loop/demo.mjs`

## Runnable example

```javascript
console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);
```

## Expected output

```text
1
3
2
```

## What is happening?

The two `console.log` calls outside the timer callback run synchronously. The `setTimeout` callback is scheduled for a later event-loop turn. A delay of `0` means it can become eligible as soon as possible; it **does not** interrupt the current call stack.

In this simple Node.js example, the observed output is `1`, `3`, then `2`. The event loop runs tasks when the current JavaScript work permits it. Browser and Node environments have their own event-loop scheduling details; this demonstration does not attempt to model every phase of either runtime.

## Common misconceptions

- A zero-millisecond timeout does **not** guarantee an instantaneous callback.
- JavaScript does not execute the timer callback while the synchronous statements above are still running.
- The event loop is an execution/scheduling mechanism, not a second JavaScript thread for this callback.

## Try it yourself

Run the example first, then change one value or statement and **predict** the output before running it again. Keep each experiment in your own copy of the file; the repository tests assume the original examples.

[Back to lesson index](../../README.md#lessons)
