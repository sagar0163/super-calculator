# WAR ROOM PLAN #6 - Flatten Calculator API + TypeScript definitions

Prior attempt already: added delegating methods in `src/index.js`, created `index.d.ts`,
added `"types"` + typescript devDep to package.json. Remaining work:

- [x] Install typescript (devDep added but node_modules never got it)
- [x] Fix `index.d.ts`: correct signatures (correlation arrays, variance/stdDev boolean flag,
      log optional base, mode/quartiles/summary return types, optional financial params,
      full Complex + Matrix classes, operation class properties on Calculator). Remove
      `declare module` wrapper so the types file is the package's module directly.
- [x] Add tsconfig.json + a type-check exercise file; verify `tsc --noEmit` passes
- [x] Add unit tests for the flat API: add/sin/cos/mean via delegation,
      complex() and matrix() factory methods
- [x] Update README programmatic API to match real behavior
      (use import not require, fix mod->modulo, drop root/ln, loanPayment->emi,
      matrix factory section, rate-as-percent)
- [x] Add `typecheck` npm script + CI step running `tsc --noEmit`
- [x] Run full test suite, fix failures
- [ ] Delete plan file, final commit referencing #6, push branch