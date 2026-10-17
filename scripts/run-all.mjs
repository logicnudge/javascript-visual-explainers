import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lessons = JSON.parse(readFileSync(resolve(projectRoot, 'lessons.json'), 'utf8'));
for (const lesson of lessons) {
  const file = resolve(projectRoot, 'lessons', lesson.slug, 'demo.mjs');
  const run = spawnSync(process.execPath, [file], { encoding: 'utf8', timeout: 5000 });
  if (run.status !== 0 || run.error) {
    console.error(`FAIL #${String(lesson.number).padStart(2,'0')} ${lesson.title}`);
    console.error(run.stderr || run.error?.message);
    process.exitCode = 1;
    break;
  }
  console.log(`\n#${String(lesson.number).padStart(2,'0')} ${lesson.title}`);
  console.log(run.stdout.trimEnd());
}
