# WAR_ROOM_PLAN_5.md — Issue #5: Input Validation

## Checklist

- [x] Matrix constructor: validate uniform row lengths (throw on jagged arrays)
- [x] Statistics: throw on empty arrays (mean, median, mode, variance, stdDev)
- [x] Statistics.min/max: replace spread operator with iterative reduce
- [x] Statistics.variance: add `sample` parameter, default to sample variance (n-1)
- [x] Financial: add input validation (reject negative principal, zero/negative rates, negative time)
- [x] EquationSolver.solveExpression: handle quadratic equations (e.g. "x^2 - 4 = 0")
- [x] Write new validation tests
- [x] Run all tests and fix any failures
