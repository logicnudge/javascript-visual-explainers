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
