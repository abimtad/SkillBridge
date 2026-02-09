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

    const makeLabel = (title = "Untitled", count = 0) => {
      return `${title} (${count})`;
    };

    lines.push(makeLabel());
    lines.push(makeLabel("Assignments", 3));

    const sum = (label, ...values) => {
      const total = values.reduce((acc, val) => acc + val, 0);
      return `${label}: ${total}`;
    };

    lines.push(sum("Points", 4, 3, 6));

    const legacy = function () {
      const values = Array.from(arguments);
      return values.join(" | ");
    };

    lines.push(`arguments: ${legacy("A", "B", "C")}`);

    return lines;
  },
};
