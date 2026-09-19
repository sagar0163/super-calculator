# War Room Plan — Issue #4: Comprehensive test coverage

## Status: mostly complete from prior attempts; finishing the last gaps

### Completed by prior attempts (verified present on branch)
- [x] Fix test infrastructure: add `vitest` + `@vitest/coverage-v8` to devDependencies, lockfile
- [x] `npm test` script wired to `vitest run`
- [x] Financial module tests (known-value verification, zero/negative edge cases)
- [x] Matrix module tests (2x2, 3x3, non-square, identity, transpose, inverse, singular)
- [x] EquationSolver tests (linear, quadratic, complex roots, malformed input, 2x2 systems)
- [x] Scientific module tests (trig degree/radian checks, logs, exp, rounding)
- [x] Complex module tests (arithmetic, magnitude, sqrt/exp/log, toString)
- [x] UnitConverter tests (length, weight, temperature, volume, data, time, area, speed)
- [x] Basic + Statistics tests (edge cases: empty arrays, negatives, zero, overflow)
- [x] Calculator.evaluate injection/attack tests (Malicious payloads, member access, malformed)
- [x] Overall coverage 99.64% lines, 160 tests green

### Remaining work for this session
- [ ] Add tests for the last uncovered branches:
  - [ ] equations `solveExpression` with bare `-` coefficient (`-x + 3 = 1`)
  - [ ] statistics `percentile` interpolation branch (non-integer index)
- [ ] Remove stray junk artifacts tracked on branch (`*.txt`, `x`) — already cleaned on main
- [ ] Restore `.gitignore` scratch entries (`*.txt`, `x`) deleted at branch point
- [ ] Re-run full suite + coverage, confirm 100% green and >80% lines
- [ ] Delete this plan file, final commit referencing #4, push branch