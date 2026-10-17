# 05. Debouncing vs Throttling

**Watch the Short:** https://www.youtube.com/shorts/Q4lU5TNQRT0  
**Run the example:** `node lessons/05-debounce-throttle/demo.mjs`

## Runnable example

```javascript
// Deterministic virtual-time simulation: no real waiting or flaky timing.
class VirtualClock {
 constructor() { this.now = 0; this.nextId = 1; this.tasks = new Map(); }
 setTimeout(callback, delay) {
    const id = this.nextId++;
    this.tasks.set(id, { at: this.now + delay, callback });
    return id;
 }
 clearTimeout(id) { this.tasks.delete(id); }
 advanceTo(target) {
    if (target < this.now) throw new RangeError('Time cannot go backwards');
    while (true) {
      const next = [...this.tasks]
        .filter(([, task]) => task.at <= target)
        .sort((a, b) => a[1].at - b[1].at || a[0] - b[0])[0];
      if (!next) break;
      const [id, task] = next;
      this.tasks.delete(id);
      this.now = task.at;
      task.callback();
    }
    this.now = target;
 }
}

function debounce(fn, waitMs, clock) {
 let timer;
 return (...args) => {
    if (timer !== undefined) clock.clearTimeout(timer);
    timer = clock.setTimeout(() => { timer = undefined; fn(...args); }, waitMs);
 };
}

function throttle(fn, intervalMs, clock) {
 let lastRun = -Infinity;
 return (...args) => {
    if (clock.now - lastRun >= intervalMs) {
      lastRun = clock.now;
      fn(...args);
    }
 };
}

const typingClock = new VirtualClock();
let searchRequests = 0;
const search = debounce(() => { searchRequests += 1; }, 300, typingClock);
for (let i = 0; i < 8; i += 1) {
 typingClock.advanceTo(i * 100);
 search();
}
typingClock.advanceTo(1000); // 300 ms after final keystroke
console.log(`8 keystrokes -> ${searchRequests} search request`);

const scrollClock = new VirtualClock();
let scrollHandlers = 0;
const onScroll = throttle(() => { scrollHandlers += 1; }, 400, scrollClock);
for (let i = 0; i < 10; i += 1) {
 scrollClock.advanceTo(i * 100);
 onScroll();
}
console.log(`10 scrolls -> ${scrollHandlers} handler runs`);
```

## Expected output

```text
8 keystrokes -> 1 search request
10 scrolls -> 3 handler runs
```

## What is happening?

**Debounce (trailing edge):** reset a wait timer whenever a new event arrives, then invoke the callback only after there have been no new events for `waitMs`. Here, 8 keystrokes occur every 100 ms; the 300 ms wait expires only after the last keystroke, producing one request.

**Throttle (leading edge):** allow at most one invocation per `intervalMs` for repeated events. Here, 10 scroll events arrive 100 ms apart, with a 400 ms interval, producing invocations at simulated 0, 400, and 800 ms.

This is a **virtual-clock illustration**, not a browser implementation or production-grade utility. Real-world helpers may need cancellation, trailing behavior, error handling and lifecycle cleanup.

## Common misconceptions

- Debouncing delays an action until activity pauses; it is not simply 'run every N ms.'
- Throttling caps execution frequency; leading-edge and trailing-edge variants differ.
- '8 keystrokes -> 1 request' and '10 scrolls -> 3 runs' depend on the *example's timing configuration*.

## Try it yourself

Run the example first, then change one value or statement and **predict** the output before running it again. Keep each experiment in your own copy of the file; the repository tests assume the original examples.

[Back to lesson index](../../README.md#lessons)
