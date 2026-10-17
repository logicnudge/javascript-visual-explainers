# 01. Why 0.1 + 0.2 Is Not Exactly 0.3

**Watch the Short:** https://www.youtube.com/shorts/nE2khVtqj1M  
**Run the example:** `node lessons/01-floating-point/demo.mjs`

## Runnable example

```javascript
const result = 0.1 + 0.2;
console.log(result);
console.log(result === 0.3);
console.log(Math.abs(result - 0.3) < Number.EPSILON);

// When amounts are whole cents, integer cents avoid this example's issue.
const cents = 10 + 20;
console.log(cents / 100);
```

## Expected output

```text
0.30000000000000004
false
true
0.3
```

## What is happening?

JavaScript `number` values use IEEE 754 binary64 floating-point representation. Values such as `0.1` and `0.2` cannot be stored exactly as finite binary fractions. Their rounded sum is the adjacent representable value displayed as `0.30000000000000004`, so exact equality with the separately rounded literal `0.3` is false.

In this **specific small-magnitude example**, the difference is less than `Number.EPSILON`. That is **not** a universal comparison tolerance: appropriate tolerance depends on magnitude, operations, and application requirements. For money, consider integer minor units when appropriate (check safe-integer bounds) or a vetted decimal representation; do not blindly use floating-point arithmetic for financial amounts.

## Common misconceptions

- `0.1 + 0.2` is not a JavaScript-specific bug; similar behavior occurs in other binary-floating-point languages.
- `Number.EPSILON` is **not** a universal threshold for all numeric comparisons.
- Storing cents as integers is useful for some currencies and quantities, but not a complete international-currency solution.

## Try it yourself

Run the example first, then change one value or statement and **predict** the output before running it again. Keep each experiment in your own copy of the file; the repository tests assume the original examples.

[Back to lesson index](../../README.md#lessons)
