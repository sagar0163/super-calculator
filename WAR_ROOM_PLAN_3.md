# War Room Plan — Issue #3: Clean up repo

- [ ] Delete junk .txt artifacts + `x` file, add `*.txt` / `x` to .gitignore
- [ ] Remove `specs/` directory (stub placeholders, no value)
- [ ] Remove unused `./data` volume mount from docker-compose.yml
- [ ] CLI: make `--stats "1,2,3,4,5"` (comma-separated) work so README example runs
- [ ] CLI: add test for comma-separated stats input
- [ ] README: remove `--matrix` CLI example (no such flag)
- [ ] README: fix Matrix "Available Operations" section to match real API
- [ ] README: remove trailing junk `# Update` line
- [ ] Verify every README CLI example runs; run full test suite
- [ ] Remove plan file and final commit