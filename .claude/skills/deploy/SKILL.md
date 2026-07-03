---
name: deploy
description: Deploy the finance tracker to staging. Runs the test/quality gate, builds the production bundle, and pushes the built code to the `staging` branch on origin. Use when the user says "deploy", "ship to staging", "push to staging", or runs /deploy.
---

# Deploy to staging

Deploying means: **gate → build → push to `staging`**. Run the steps in order and
**stop immediately if any step fails** — never build on a failing gate, never push
a failed build. Report what happened at each step.

## 1. Quality gate (run all checks first)

Run the project's test/quality checks and require them to pass before going further.

```bash
npm run lint
```

> There is no test runner configured in this project yet (`package.json` has no
> `test` script). Lint is the gate for now. **When a real test runner is added,
> update this step to `npm test` (or `npm test && npm run lint`)** and treat a test
> failure as a hard stop.

If the gate fails, stop and show the output. Do not build or push.

## 2. Build the production bundle

```bash
npm run build
```

This writes the optimized bundle to `dist/`. If the build errors, stop and report —
do not push a broken build.

## 3. Push to the staging area

"Staging" for this project is the **`staging` branch on `origin`** (the GitHub
remote). Publish the current commit there:

```bash
# from the branch you deploy from (usually main)
git push origin HEAD:staging
```

If the local working tree has uncommitted changes you intend to deploy, commit them
first (branch off if you're on `main` and the user hasn't authorized committing to
it), then push. Pushing publishes to a shared remote — if anything about the state
is surprising (dirty tree, unexpected branch, diverged `staging`), surface it and
confirm before pushing rather than force-pushing over it.

## Done

Report the outcome concisely: gate result, build result, and the pushed commit +
branch (`origin/staging`). If the repo has a staging hosting hook wired to that
branch later, note the deploy URL here.
