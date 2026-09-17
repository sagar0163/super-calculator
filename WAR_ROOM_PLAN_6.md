# WAR ROOM PLAN — Issue #6: Flatten Calculator API + TS types

Prior state (from earlier attempt): feature implementation, index.d.ts, tsconfig,
tests, README, CI typecheck step, and the plan-file removal "final" commit are done.
Resuming work: the branch must merge cleanly into `main`, which now carries a
mathjs-based evaluate/CLI, unified units API, `npm audit` CI step, and README rewrite.

Remaining checklist:

- [ ] Merge origin/main into war-room-issue-6 and resolve conflicts
- [ ] Resolve ci.yml: keep both `tsc --noEmit` typecheck and `npm audit` steps
- [ ] Resolve README.md: keep issue-6 flattened API + TS examples, fold in unified units API
- [ ] Resolve package-lock.json (regenerate via npm install)
- [ ] Add `index.d.ts` to `files` in package.json so types ship with the npm package
- [ ] Run full test suite and `tsc --noEmit` on merged tree
- [ ] Re-verify all issue-6 acceptance criteria (add/sin/mean/complex/matrix) on merged code
- [ ] Remove plan file, final commit, push