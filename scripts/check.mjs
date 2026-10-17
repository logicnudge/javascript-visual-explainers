import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lessons = JSON.parse(readFileSync(resolve(root, 'lessons.json'), 'utf8'));
const jsFiles = [resolve(root, 'scripts/check.mjs'), resolve(root,'scripts/run-all.mjs'),resolve(root,'tests/lessons.test.mjs'), ...lessons.map(l=>resolve(root,'lessons',l.slug,'demo.mjs'))];
for (const file of jsFiles) {
  const run = spawnSync(process.execPath,['--check',file],{encoding:'utf8'});
  if (run.status !== 0) { console.error(run.stderr);process.exit(1); }
}
const forbidden = [
  /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
  /[A-Z]:\\Users\\/i,
  /gh[pousr]_[A-Za-z0-9_]{25,}/,
  /github_pat_[A-Za-z0-9_]{30,}/,
  /-----BEGIN (?:RSA|OPENSSH|EC) PRIVATE KEY-----/
];
function allFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (entry.name === '.git' || entry.name === 'node_modules') return [];
    const file = resolve(dir, entry.name);
    return entry.isDirectory() ? allFiles(file) : [file];
  });
}
for (const file of allFiles(root)) {
  const source = readFileSync(file,'utf8');
  for(const pattern of forbidden) {
    if(pattern.test(source)){ console.error(`Potential personal identifier in ${file}: ${pattern}`); process.exit(1); }
  }
}
console.log(`Syntax OK (${jsFiles.length} JS files); personal-identifier scan clean.`);
