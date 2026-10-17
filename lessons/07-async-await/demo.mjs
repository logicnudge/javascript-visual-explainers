console.log('A');

async function runTask() {
  console.log('B');
  await Promise.resolve();
  console.log('C');
}

runTask();
console.log('D');
