# 10. Why Changing One Object Affects Another

**Watch the Short:** https://www.youtube.com/shorts/LhOcmbUolHg  
**Run the example:** `node lessons/10-object-references/demo.mjs`

## Runnable example

```javascript
const a = { score: 10, meta: { level: 1 } };
const b = a; // another reference to the SAME object
b.score = 99;
console.log(a.score);
console.log(b.score);

const c = { ...a }; // NEW outer object, but a shallow copy
c.score = 7;
console.log(c.score);
console.log(a.score);

c.meta.level = 2; // nested object is still shared
console.log(a.meta.level);
```

## Expected output

```text
99
99
7
99
2
```

## What is happening?

`b = a` copies an **object reference**, not the object itself. Both variable bindings refer to one object, so `b.score = 99` is visible through `a.score`.

`{ ...a }` creates a **new outer object** `c`. Updating its top-level `score` doesn't update the original `a.score`. However, object spread performs a **shallow copy**: `a.meta` and `c.meta` still refer to the same nested object, so modifying `c.meta.level` also changes the value observed through `a.meta.level`.

For genuinely separate nested data, choose an appropriate deep-copying approach for the data shape. `structuredClone` is helpful for many cloneable values but is not a universal solution for every kind of JavaScript object.

## Common misconceptions

- `const b = a` does not clone an object.
- The spread operator makes a shallow copy, not a deep copy.
- `const` protects the binding from reassignment; it does **not** freeze object properties.

## Try it yourself

Run the example first, then change one value or statement and **predict** the output before running it again. Keep each experiment in your own copy of the file; the repository tests assume the original examples.

[Back to lesson index](../../README.md#lessons)
