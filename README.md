# Logic Nudge | JavaScript Visual Explainers

**A little insight. A lot of clarity.**

A companion code library for our first **10 original JavaScript Shorts**. Every lesson has a standalone runnable example, expected output, a concise explanation, and common misconceptions.

> The videos teach concepts visually; this repository lets you run and experiment with the code yourself. This is an educational collection, not a production utility package.

## Quick start

Requirements: [Node.js](https://nodejs.org/) **20+**. No npm packages or paid services needed.

```bash
npm test            # verify all 10 expected outputs
npm run check       # syntax and accidental-identifier checks
npm run demos       # run all examples in sequence
npm run verify      # all checks and all demos
```

Run a lesson individually:

```bash
node lessons/01-floating-point/demo.mjs
```

## Lessons

| # | Topic | Runnable code and explanation | Watch the Short |
|---|---|---|---|
| 01 | Binary floating-point precision | [Open lesson](lessons/01-floating-point/README.md) | [Watch](https://www.youtube.com/shorts/nE2khVtqj1M) |
| 02 | Event loop: 1, 3, 2 | [Open lesson](lessons/02-event-loop/README.md) | [Watch](https://www.youtube.com/shorts/7a7VNG8n54g) |
| 03 | Promises vs timers | [Open lesson](lessons/03-promise-microtasks/README.md) | [Watch](https://www.youtube.com/shorts/mQD_s2jrCt0) |
| 04 | Closures | [Open lesson](lessons/04-closures/README.md) | [Watch](https://www.youtube.com/shorts/7nz-mndOOEM) |
| 05 | Debouncing vs throttling | [Open lesson](lessons/05-debounce-throttle/README.md) | [Watch](https://www.youtube.com/shorts/Q4lU5TNQRT0) |
| 06 | `map`, `filter`, `reduce` | [Open lesson](lessons/06-array-methods/README.md) | [Watch](https://www.youtube.com/shorts/EAPt36cUTas) |
| 07 | Does `await` block everything? | [Open lesson](lessons/07-async-await/README.md) | [Watch](https://www.youtube.com/shorts/RtcGbRTGS_w) |
| 08 | The `this` binding | [Open lesson](lessons/08-this-binding/README.md) | [Watch](https://www.youtube.com/shorts/bsw1N-3FVy8) |
| 09 | Hoisting and Temporal Dead Zone | [Open lesson](lessons/09-hoisting-tdz/README.md) | [Watch](https://www.youtube.com/shorts/wgUcjF7LqhE) |
| 10 | Object references vs shallow copy | [Open lesson](lessons/10-object-references/README.md) | [Watch](https://www.youtube.com/shorts/LhOcmbUolHg) |

## Learning approach

1. **Predict:** What do you expect the code to log?
2. **Run:** Use `node lessons/NN-topic/demo.mjs`.
3. **Explain:** Read the corresponding lesson's explanation and misconceptions.
4. **Experiment:** Modify a local copy and check your hypothesis.

Some examples show one specific runtime or timing configuration. They illustrate their stated outputs; they do not promise identical behavior for every platform and situation.

## Find us

- [YouTube Shorts](https://www.youtube.com/@logicnudge)
- [Instagram](https://www.instagram.com/logicnudge/)
- [Facebook](https://www.facebook.com/logicnudge/)
- [Threads](https://www.threads.com/@logicnudge)
- [LinkedIn](https://www.linkedin.com/company/logicnudge)

## Contributing and license

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Code and text in this repo are available under the [MIT License](LICENSE). All video assets remain outside this repository and are not covered by that license.
