# War Room Issue #4 — Test coverage for all modules

Prior attempts already delivered the bulk of this work. Remaining subtasks
are verification + a small finishing touch.

## Build system
- [x] vitest + @vitest/coverage-v8 declared in package.json devDependencies
- [x] package-lock.json present (npm ci can install)

## Test suites per module (each ≥5 tests)
- [x] Financial (22 tests, verified against known values: EMI 2124.70, CAGR 10%, etc.)
- [x] Matrix (18 tests: 2x2 det/inverse, 3x3 det, non-square transpose, dimension errors)
- [x] EquationSolver (17 tests: linear, quadratic +ve/0/-ve discriminant, malformed, system)
- [x] Scientific (18 tests: degree trig, inverse trig, hyperbolic, log, rounding)
- [x] Complex (16 tests: arithmetic, magnitude, argument, sqrt, exp, log, toString)
- [x] UnitConverter (30 tests: all 30 conversion methods)
- [x] Basic (10 tests: incl. MAX_VALUE overflow)
- [x] Statistics (12 tests: incl. empty array, interpolation, correlation)

## Edge cases
- [x] Empty input (empty arrays, empty expression string), zero, negative, overflow

## Evaluator security
- [x] Injection tests in calculator.test.js (constructor/CDN, process, require, Function, member access)

## Gates
- [x] `npm test` passes (163 tests green)
- [x] Coverage report shows >80% line coverage (currently 100% lines, 99.18% branches)
- [ ] Add `test:coverage` script so the coverage report is reproducible via npm
- [ ] Final verification run (tests + coverage), remove plan file, commit + push