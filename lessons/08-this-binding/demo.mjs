'use strict';

function greet() { return this?.name; }
const user = { name: 'Alex', greet };

console.log(user.greet());
const loose = user.greet;
console.log(String(loose()));
console.log(loose.call(user));
