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
