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
