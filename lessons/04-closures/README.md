# 04. How Closures Remember Variables

**Watch the Short:** https://www.youtube.com/shorts/7nz-mndOOEM  
**Run the example:** `node lessons/04-closures/demo.mjs`

## Runnable example

```javascript
function makeCounter() {
 let count = 0;
 return function increment() {
    count += 1;
    return count;
 };
}

const counter = makeCounter();
console.log(counter());
console.log(counter());
```

## Expected output

```text
1
2
```

## What is happening?

The returned `increment` function is a closure: it retains access to the lexical environment in which it was created. Although `makeCounter()` has returned, the variable `count` remains reachable through this function. The same closure mutates and reads the same `count` binding on each invocation.

A *different* call to `makeCounter()` produces a separate counter. Closures retain access to bindings; they do not automatically copy all values at declaration time.

## Common misconceptions

- A closure does not require a function to be nested inside a class.
- Captured variables can change over time.
- Each invocation of `makeCounter()` creates its own lexical environment.

## Try it yourself

Run the example first, then change one value or statement and **predict** the output before running it again. Keep each experiment in your own copy of the file; the repository tests assume the original examples.

[Back to lesson index](../../README.md#lessons)
