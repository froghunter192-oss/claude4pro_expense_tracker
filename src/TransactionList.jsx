import { useState } from 'react'
import { CATEGORIES, CATEGORY_COLORS } from './categories.js'
import { formatCurrency } from './format.js'

function TransactionList({ transactions, onDeleteTransactions }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelected = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    const count = selectedIds.length;
    const message = count === 1
      ? "Delete 1 transaction? This cannot be undone."
      : `Delete ${count} transactions? This cannot be undone.`;
    if (window.confirm(message)) {
      onDeleteTransactions(selectedIds);
      setSelectedIds([]);
    }
  };

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  return (
    <section className="card transactions">
      <div className="transactions-head">
        <h2 className="card__title">
          <span className="material-symbols-outlined">receipt_long</span>
          Transactions
        </h2>
        <div className="filters">
          {selectedIds.length > 0 && (
            <button className="btn btn--delete" onClick={handleDeleteSelected}>
              <span className="material-symbols-outlined">delete</span>
              Delete ({selectedIds.length})
            </button>
          )}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            aria-label="Filter by type"
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="empty-state">
          <span className="material-symbols-outlined">savings</span>
          <p>No transactions match these filters yet.</p>
        </div>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th className="col-select"></th>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th className="col-amount">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(t => (
                <tr key={t.id}>
                  <td className="col-select">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(t.id)}
                      onChange={() => toggleSelected(t.id)}
                      aria-label={`Select ${t.description}`}
                    />
                  </td>
                  <td className="col-date">{t.date}</td>
                  <td className="col-desc">{t.description}</td>
                  <td>
                    <span className="chip" style={{ "--chip-color": CATEGORY_COLORS[t.category] }}>
                      <span className="chip__dot"></span>
                      {t.category}
                    </span>
                  </td>
                  <td className="col-amount">
                    <span className={t.type === "income" ? "amount income" : "amount expense"}>
                      {t.type === "income" ? "+" : "−"}{formatCurrency(t.amount)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default TransactionList
