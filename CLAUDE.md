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

Single-page React 19 app bootstrapped by Vite. There is no router, no state library, no backend, and no persistence — data lives in `useState` and resets on reload.

**`src/App.jsx`** is the container. It owns the single source of truth — `transactions` (seeded with hardcoded sample data) — and an `addTransaction` handler, then composes three child components. A transaction is `{ id, description, amount, type, category, date }` where `type` is `"income"` or `"expense"` and `amount` is a **number**.

Child components (each in its own file under `src/`, presentational/self-contained):
- **`Summary.jsx`** — receives `transactions`, computes `totalIncome`, `totalExpenses`, and `balance` internally (each render, no memoization), and renders the summary cards.
- **`TransactionForm.jsx`** — owns its own form input state (`description`, `amount`, `type`, `category`), and on submit calls the `onAddTransaction(transaction)` prop with a fully-built transaction (coercing `amount` via `Number()`), then resets its fields. It does not touch `transactions` directly.
- **`TransactionList.jsx`** — receives `transactions`, owns the filter state (`filterType`, `filterCategory`), derives the filtered list inline, and renders the filter dropdowns + table.

Because state is pushed down, adding a transaction flows: `TransactionForm` → `onAddTransaction` → `App` updates `transactions` → `Summary` and `TransactionList` re-render from the new prop.

The `categories` constant is currently duplicated in `TransactionForm.jsx` and `TransactionList.jsx` (no shared module yet).

Entry point: `src/main.jsx` mounts `<App />` under React `StrictMode` into `#root` (`index.html`). Styling is plain CSS in `src/App.css` and `src/index.css` (no CSS framework).

## Conventions

- ESLint (flat config in `eslint.config.js`) with the recommended JS, react-hooks, and react-refresh rules. The `no-unused-vars` rule ignores identifiers matching `^[A-Z_]` (constants/components).
- JSX files use `.jsx`; ES modules throughout (`"type": "module"`).
