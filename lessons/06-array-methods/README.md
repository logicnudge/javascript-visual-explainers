# 06. map vs filter vs reduce

**Watch the Short:** https://www.youtube.com/shorts/EAPt36cUTas  
**Run the example:** `node lessons/06-array-methods/demo.mjs`

## Runnable example

```javascript
const values = [1, 2, 3, 4];

const doubled = values.map((value) => value * 2);
const even = values.filter((value) => value % 2 === 0);
const sum = values.reduce((total, value) => total + value, 0);

console.log(JSON.stringify(doubled));
console.log(JSON.stringify(even));
console.log(sum);
```

## Expected output

```text
[2,4,6,8]
[2,4]
10
```

## What is happening?

`map` transforms each array element into a value in a **new array**. `filter` selects the elements that pass a condition into a **new array**. `reduce` accumulates values into a result—here, a number—using an explicit initial value of `0`.

In this example, the original `values` array is not mutated. `reduce` is more flexible than 'always returns a number': it can also accumulate arrays, objects, strings, and other types.

## Common misconceptions

- `map` does not filter items by default.
- `filter` retains original element values, not the Boolean results of the predicate.
- `reduce` is not restricted to returning a single numeric sum.

## Try it yourself

Run the example first, then change one value or statement and **predict** the output before running it again. Keep each experiment in your own copy of the file; the repository tests assume the original examples.

[Back to lesson index](../../README.md#lessons)
