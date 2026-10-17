# 09. Why var Works but let Throws

**Watch the Short:** https://www.youtube.com/shorts/wgUcjF7LqhE  
**Run the example:** `node lessons/09-hoisting-tdz/demo.mjs`

## Runnable example

```javascript
// Two independent function scopes (two separate example runs).
function varExample() {
 console.log(a); // undefined: binding exists and is initialized
 var a = 10;
 console.log(a); // 10
}

function letExample() {
 console.log(b); // ReferenceError: b is in its TDZ
 let b = 10;
 console.log(b); // never reached
}

varExample();
try {
 letExample();
} catch (error) {
 console.log(error.name);
}
```

## Expected output

```text
undefined
10
ReferenceError
```

## What is happening?

Both `var` and `let` declarations are **hoisted** in the sense that bindings are established during scope initialization. `var` bindings are initialized to `undefined` on entering the function, so accessing `a` before the assignment prints `undefined`.

A `let` binding exists but stays **uninitialized** until its declaration is evaluated. Accessing `b` before then is within its *Temporal Dead Zone* and throws `ReferenceError`. The error interrupts `letExample()` before `let b = 10` executes.

The examples are run in **separate function scopes** and the second one's error is caught outside. Do not combine both declarations into a single top-level script without accounting for the exception terminating that script's flow.

## Common misconceptions

- `let` **is also hoisted**; it is not initialized early.
- The TDZ relates to use before initialization, not to variables being absent from scope.
- A `ReferenceError` stops the affected execution path unless it is handled.

## Try it yourself

Run the example first, then change one value or statement and **predict** the output before running it again. Keep each experiment in your own copy of the file; the repository tests assume the original examples.

[Back to lesson index](../../README.md#lessons)
