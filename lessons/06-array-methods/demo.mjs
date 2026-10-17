const values = [1, 2, 3, 4];

const doubled = values.map((value) => value * 2);
const even = values.filter((value) => value % 2 === 0);
const sum = values.reduce((total, value) => total + value, 0);

console.log(JSON.stringify(doubled));
console.log(JSON.stringify(even));
console.log(sum);
