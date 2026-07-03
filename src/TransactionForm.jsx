import { useState } from 'react'
import { CATEGORIES } from './categories.js'

function TransactionForm({ onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || Number(amount) <= 0) return;

    onAddTransaction({
      id: crypto.randomUUID(),
      description,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory(CATEGORIES[0]);
  };

  return (
    <section className="card add-transaction">
      <h2 className="card__title">
        <span className="material-symbols-outlined">add_circle</span>
        Add transaction
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="field field--desc">
          <label htmlFor="tx-description">Description</label>
          <input
            id="tx-description"
            type="text"
            placeholder="e.g. Coffee with a client"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="field field--amount">
          <label htmlFor="tx-amount">Amount</label>
          <div className="input-affix">
            <span>$</span>
            <input
              id="tx-amount"
              type="number"
              min="0"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="field field--category">
          <label htmlFor="tx-category">Category</label>
          <select
            id="tx-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="field field--type">
          <label>Type</label>
          <div className="segmented" role="group" aria-label="Transaction type">
            <button
              type="button"
              className={type === "expense" ? "active" : ""}
              aria-pressed={type === "expense"}
              onClick={() => setType("expense")}
            >
              Expense
            </button>
            <button
              type="button"
              className={type === "income" ? "active" : ""}
              aria-pressed={type === "income"}
              onClick={() => setType("income")}
            >
              Income
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn--filled">
          <span className="material-symbols-outlined">add</span>
          Add transaction
        </button>
      </form>
    </section>
  );
}

export default TransactionForm
