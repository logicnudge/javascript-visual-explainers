import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { stripVTControlCharacters } from 'node:util';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lessons = JSON.parse(readFileSync(resolve(root, 'lessons.json'), 'utf8'));

// Inherit the regular environment, but avoid terminal styling in lesson output.
// Windows PowerShell/terminal sessions may set FORCE_COLOR, even for captured pipes.
const lessonEnv = { ...process.env, NO_COLOR: '1', NODE_DISABLE_COLORS: '1' };
delete lessonEnv.FORCE_COLOR;
delete lessonEnv.CLICOLOR_FORCE;

test('ten uniquely indexed lessons with real video links', () => {
  assert.equal(lessons.length, 10);
  assert.deepEqual(lessons.map(x => x.number), [1,2,3,4,5,6,7,8,9,10]);
  assert.equal(new Set(lessons.map(x => x.slug)).size, 10);
  assert.equal(new Set(lessons.map(x => x.youtube)).size, 10);
  assert.ok(lessons.every(x => /^https:\/\/www\.youtube\.com\/shorts\/[\w-]{11}$/.test(x.youtube)));
});

for (const lesson of lessons) {
  test(`#${String(lesson.number).padStart(2, '0')} ${lesson.title}`, () => {
    const file = resolve(root, 'lessons', lesson.slug, 'demo.mjs');
    const md = resolve(root, 'lessons', lesson.slug, 'README.md');
    assert.ok(existsSync(file), `${file} must exist`);
    assert.ok(existsSync(md), `${md} must exist`);
    const run = spawnSync(process.execPath, [file], { encoding: 'utf8', timeout: 5000, env: lessonEnv });
    assert.ifError(run.error);
    assert.equal(run.status, 0, run.stderr);
    const actual = stripVTControlCharacters(run.stdout).replace(/\r\n?/g, '\n').trimEnd();
    assert.deepEqual(actual.split('\n'), lesson.output);
    const doc = readFileSync(md, 'utf8');
    assert.ok(doc.includes(lesson.youtube));
    assert.ok(doc.includes('## Common misconceptions'));
    assert.ok(doc.includes('## Expected output'));
  });
}
