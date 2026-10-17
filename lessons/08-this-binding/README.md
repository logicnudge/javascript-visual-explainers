# 08. Why JavaScript this Changes

**Watch the Short:** https://www.youtube.com/shorts/bsw1N-3FVy8  
**Run the example:** `node lessons/08-this-binding/demo.mjs`

## Runnable example

```javascript
'use strict';

function greet() { return this?.name; }
const user = { name: 'Alex', greet };

console.log(user.greet());
const loose = user.greet;
console.log(String(loose()));
console.log(loose.call(user));
```

## Expected output

```text
Alex
undefined
Alex
```

## What is happening?

This example uses an **ordinary function** and **strict mode**. Calling `user.greet()` sets `this` to `user`. Copying that method to `loose` and calling it as a plain function loses that receiver; in strict mode, `this` is `undefined`. The `?.` operator lets `this?.name` return `undefined` without throwing. Finally, `.call(user)` explicitly supplies the receiver.

Arrow functions have **lexical** `this`, and bound functions behave differently. Thus 'the call site determines `this`' is a useful rule for ordinary, unbound functions—not every possible function kind.

## Common misconceptions

- Detaching a method does not preserve its original receiver.
- In strict mode, a plain function call has `this === undefined`.
- Optional chaining prevents a throw here; it does not restore `this`.
- Arrow functions have lexical `this`; don't apply this demonstration to them unchanged.

## Try it yourself

Run the example first, then change one value or statement and **predict** the output before running it again. Keep each experiment in your own copy of the file; the repository tests assume the original examples.

[Back to lesson index](../../README.md#lessons)
