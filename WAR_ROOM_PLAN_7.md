# WAR ROOM PLAN — Issue #7: Unified UnitConverter + --convert CLI

## Subtasks

- [x] Rewrite `src/operations/units.js`: CONVERSIONS lookup table (length, weight, temperature, volume, data, time, area, speed), `convert(value, from, to)` with alias normalization, same-unit shortcut, chained conversion through base unit, clear error on unknown unit
- [x] Keep backward-compatible individual methods as deprecated wrappers that emit a one-time deprecation warning and delegate to `convert()`
- [x] Implement `--convert` CLI parsing in `src/cli.js` (support `--convert 100 km to miles`, `--convert 100 km miles`, quoted `--convert "100 km to miles"`), print real result, error on bad input
- [x] Add tests: `convert()` API correctness (km->miles, chained km->feet, temperature, all categories), unknown-unit error, deprecated method still works + warns, CLI parsing behavior
- [x] Update README with working `--convert` examples and programmatic `convert()` API
- [x] Run `npm test`, fix failures, commit incrementally

## Facts / Constraints

- CLI binary is `calc`, reads raw argv. Existing stub at cli.js:51-59 just echoes input.
- `calc.units` is a `UnitConverter` instance attached in Calculator constructor (index.js:25).
- Vitest is the test runner (`npm test` = `vitest run`), tests in `test/**/*.test.js`.
- Modules are ESM (`"type": "module"`).
- Keep branch `war-room-issue-7`; commit after each checked-off subtask.