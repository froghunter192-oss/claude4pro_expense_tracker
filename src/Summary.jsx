import { formatCurrency } from './format.js'

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <section className="summary">
      <div className="balance-card">
        <div className="balance-card__label">
          <span className="material-symbols-outlined">account_balance_wallet</span>
          Total balance
        </div>
        <p className="balance-card__amount">{formatCurrency(balance)}</p>
        <p className="balance-card__hint">
          {balance >= 0
            ? "You're in the green this period."
            : "Spending is running ahead of income."}
        </p>
      </div>

      <div className="stat-grid">
        <div className="stat-card stat-card--income">
          <div className="stat-card__icon">
            <span className="material-symbols-outlined">trending_up</span>
          </div>
          <div>
            <h3>Income</h3>
            <p className="stat-card__amount income">{formatCurrency(totalIncome)}</p>
          </div>
        </div>

        <div className="stat-card stat-card--expense">
          <div className="stat-card__icon">
            <span className="material-symbols-outlined">trending_down</span>
          </div>
          <div>
            <h3>Expenses</h3>
            <p className="stat-card__amount expense">{formatCurrency(totalExpenses)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Summary
