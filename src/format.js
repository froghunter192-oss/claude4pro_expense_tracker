// Shared money formatter so every amount reads the same across the app.
const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const formatCurrency = (amount) => currency.format(Number(amount));
