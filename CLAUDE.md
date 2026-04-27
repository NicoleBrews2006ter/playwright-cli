## Commit Convention

Semantic commit messages: `label(scope): description`

Labels: `fix`, `feat`, `chore`, `docs`, `test`, `devops`

```bash
git checkout -b fix-39562
# ... make changes ...
git add <changed-files>
git commit -m "$(cat <<'EOF'
fix(proxy): handle SOCKS proxy authentication

Fixes: https://github.com/microsoft/playwright/issues/39562
EOF
)"
git push origin fix-39562
gh pr create --repo microsoft/playwright --head username:fix-39562 \
  --title "fix(proxy): handle SOCKS proxy authentication" \
  --body "$(cat <<'EOF'
## Summary
- <describe the change very! briefly>

Fixes https://github.com/microsoft/playwright/issues/39562
EOF
)"
```

Never add Co-Authored-By agents in commit message.
Branch naming for issue fixes: `fix-<issue-number>`
Branch naming for features: `feat-<short-description>`

## Notes

- Upstream repo: https://github.com/microsoft/playwright-cli
- When syncing with upstream: `git fetch upstream && git rebase upstream/main`
- Personal note: prefer `rebase` over `merge` to keep history linear
- Run `npm run lint` before committing to catch issues early
- Run `npm test` locally before opening a PR to avoid CI surprises
- Personal note: use `gh pr view --web` to quickly open the PR in the browser after creating it
- Personal note: use `gh issue list --repo microsoft/playwright-cli` to browse open issues for contribution ideas

## Local Dev Setup

```bash
npm install
npm run build   # compile TypeScript
npm run lint    # eslint check
npm test        # run full test suite
```
