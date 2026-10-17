const result = 0.1 + 0.2;
console.log(result);
console.log(result === 0.3);
console.log(Math.abs(result - 0.3) < Number.EPSILON);

// When amounts are whole cents, integer cents avoid this example's issue.
const cents = 10 + 20;
console.log(cents / 100);
