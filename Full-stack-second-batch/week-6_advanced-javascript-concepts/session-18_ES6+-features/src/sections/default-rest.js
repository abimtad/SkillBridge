export const defaultRestSection = {
  id: "default-rest",
  title: "Default Parameters and Rest Parameters",
  summary: "Simplify function signatures with defaults and rest.",
  tags: ["Defaults", "Rest"],
  challenges: [
    "Add a default for currency and format the output.",
    "Replace arguments usage with rest parameters.",
    "Show a case where passing undefined triggers defaults.",
  ],
  run() {
    const lines = [];

    lines.push("--- 1. Default parameters ---");
    // Instead of: title = title || "Untitled"
    const makeLabel = (title = "Untitled", count = 0) => {
      return `${title} (${count})`;
    };
    lines.push("makeLabel() with no args → uses defaults:");
    lines.push(`  ${makeLabel()}`);
    lines.push("makeLabel('Assignments', 3) → both provided:");
    lines.push(`  ${makeLabel("Assignments", 3)}`);

    lines.push("");
    lines.push("--- 2. undefined triggers default ---");
    lines.push("Passing undefined means 'use default':");
    lines.push(`  makeLabel(undefined, 5) → ${makeLabel(undefined, 5)}`);

    lines.push("");
    lines.push("--- 3. Rest parameters (...values) ---");
    // Rest collects all remaining arguments into a real array
    const sum = (label, ...values) => {
      const total = values.reduce((acc, val) => acc + val, 0);
      return `${label}: ${total}`;
    };
    lines.push("sum('Points', 4, 3, 6) → values = [4, 3, 6]");
    lines.push(`  ${sum("Points", 4, 3, 6)}`);

    lines.push("");
    lines.push("--- 4. Legacy: arguments (for comparison) ---");
    const legacy = function () {
      const values = Array.from(arguments); // arguments is array-like, not a real array
      return values.join(" | ");
    };
    lines.push("legacy('A', 'B', 'C') using arguments:");
    lines.push(`  ${legacy("A", "B", "C")}`);
    lines.push("Prefer rest params: they're a real array and work with arrow functions.");

    return lines;
  },
};
