import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { CATEGORY_COLORS } from './categories.js'
import { formatCurrency } from './format.js'

function SpendingChart({ transactions }) {
  const byCategory = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});

  const data = Object.entries(byCategory)
    .map(([category, value]) => ({ category, value }))
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) {
    return (
      <section className="card spending-chart">
        <h2 className="card__title">
          <span className="material-symbols-outlined">donut_large</span>
          Spending by category
        </h2>
        <p className="subtitle">No expenses yet.</p>
      </section>
    );
  }

  return (
    <section className="card spending-chart">
      <h2 className="card__title">
        <span className="material-symbols-outlined">donut_large</span>
        Spending by category
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={64}
            outerRadius={104}
            paddingAngle={2}
            label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map(d => (
              <Cell
                key={d.category}
                fill={CATEGORY_COLORS[d.category] || "#898781"}
                stroke="#ffffff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatCurrency(value)}
            contentStyle={{
              borderRadius: 12,
              border: 'none',
              boxShadow: '0 4px 8px 3px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.10)',
              fontFamily: 'Roboto, sans-serif',
              fontSize: 13,
              textTransform: 'capitalize',
            }}
          />
          <Legend
            iconType="circle"
            formatter={(value) => (
              <span style={{ color: '#44474e', fontSize: 13, textTransform: 'capitalize' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
}

export default SpendingChart
