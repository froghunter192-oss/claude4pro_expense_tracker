# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Expense/finance tracker — the starter project for a Claude Code course. Per the README, it **intentionally ships with a bug, poor UI, and messy code**, which are fixed incrementally during the course. Do not assume existing code is correct or idiomatic; treat questionable code as a candidate for the fix being worked on rather than a pattern to imitate.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start Vite dev server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build locally
npm run lint     # run ESLint over the project
```

There is no test runner configured — `package.json` has no `test` script and no testing library is installed.

## Architecture

Single-page React 19 app bootstrapped by Vite. The entire application is one component: **`src/App.jsx`**. There is no router, no state library, no backend, and no persistence — all state is `useState` in `App`, so data resets on reload.

Data flow in `App`:
- `transactions` is the source of truth (seeded with hardcoded sample data). Each transaction is `{ id, description, amount, type, category, date }` where `type` is `"income"` or `"expense"`.
- Derived values (`totalIncome`, `totalExpenses`, `balance`, `filteredTransactions`) are computed inline on every render from `transactions` plus the filter state — there is no memoization.
- The add-transaction form and the type/category filters each have their own `useState` fields; `handleSubmit` appends a new transaction and resets the form.

Note that `amount` is stored as a **string** (both in seed data and from the number input), which matters for any arithmetic over transactions.

Entry point: `src/main.jsx` mounts `<App />` under React `StrictMode` into `#root` (`index.html`). Styling is plain CSS in `src/App.css` and `src/index.css` (no CSS framework).

## Conventions

- ESLint (flat config in `eslint.config.js`) with the recommended JS, react-hooks, and react-refresh rules. The `no-unused-vars` rule ignores identifiers matching `^[A-Z_]` (constants/components).
- JSX files use `.jsx`; ES modules throughout (`"type": "module"`).
