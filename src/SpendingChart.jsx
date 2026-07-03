import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Fixed hue per category so a color always follows the same entity, never its rank.
// Values are the validated categorical slots from the data-viz reference palette (light surface).
const CATEGORY_COLORS = {
  food: "#2a78d6",          // blue
  housing: "#1baf7a",       // aqua
  utilities: "#eda100",     // yellow
  transport: "#008300",     // green
  entertainment: "#4a3aa7", // violet
  salary: "#e34948",        // red
  other: "#e87ba4",         // magenta
};

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
      <div className="spending-chart">
        <h2>Spending by Category</h2>
        <p className="subtitle">No expenses yet.</p>
      </div>
    );
  }

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map(d => (
              <Cell
                key={d.category}
                fill={CATEGORY_COLORS[d.category] || "#898781"}
                stroke="#fcfcfb"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart
