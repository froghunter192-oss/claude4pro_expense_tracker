// Single source of truth for categories and their color.
// The color follows the entity everywhere it appears — the pie slice in
// SpendingChart and the chip dot in TransactionList are always the same hue.
// Values are the validated categorical slots from the data-viz reference palette.
export const CATEGORIES = [
  "food",
  "housing",
  "utilities",
  "transport",
  "entertainment",
  "salary",
  "other",
];

export const CATEGORY_COLORS = {
  food: "#2a78d6",          // blue
  housing: "#1baf7a",       // aqua
  utilities: "#eda100",     // yellow
  transport: "#008300",     // green
  entertainment: "#4a3aa7", // violet
  salary: "#e34948",        // red
  other: "#e87ba4",         // magenta
};
