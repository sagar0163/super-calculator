# WAR ROOM PLAN — Issue #1: Replace Function() eval with proper expression parser

## Subtask checklist

- [x] Install expr-eval dependency and add to package.json
- [x] Rewrite `evaluate()` in src/index.js using expr-eval (remove Function constructor)
- [x] Ensure all required operators/functions supported: + - * / ^ %, sin cos tan, log, ln, exp, sqrt, abs, pi, e
- [x] Add unit tests for expression parsing edge cases (malformed input, injection attempts)
- [x] Run full test suite; verify existing tests still pass
- [ ] Final cleanup + commit + push branch