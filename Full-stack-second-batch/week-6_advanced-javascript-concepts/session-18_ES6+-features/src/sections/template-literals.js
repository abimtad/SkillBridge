// Tagged template: receives string parts and interpolated values, returns custom string
const emphasize = (strings, ...values) => {
  return strings
    .map((chunk, index) => `${chunk}${values[index] ?? ""}`)
    .join("")
    .replace(/\b(ES6\+|template)\b/gi, "**$1**");
};

export const templateSection = {
  id: "template-literals",
  title: "Template Literals and String Methods",
  summary: "Use interpolation, multiline strings, and modern helpers.",
  tags: ["Template", "Strings"],
  challenges: [
    "Rewrite the sentence using concatenation, then compare readability.",
    "Add an example using padStart and padEnd.",
    "Create your own tagged template to highlight keywords.",
  ],
  run() {
    const lines = [];
    const student = "Amira";
    const score = 91;

    lines.push("--- 1. Interpolation (backticks + ${ }) ---");
    const message = `${student} scored ${score} on the ES6+ quiz.`;
    lines.push(message);
    lines.push("(No more: student + ' scored ' + score + ' on...')");

    lines.push("");
    lines.push("--- 2. Multiline strings ---");
    const multiline = `Notes:
- Template literals handle
- multiline strings easily.`;
    lines.push(multiline);

    lines.push("");
    lines.push("--- 3. String.raw (no escape processing) ---");
    const rawMessage = String.raw`Path stays the same: C:\dev\lesson`;
    lines.push(rawMessage);
    lines.push("Backslashes are kept as-is — useful for paths and regex.");

    lines.push("");
    lines.push("--- 4. Tagged template (custom processing) ---");
    const emphasized = emphasize`Use template literals for ES6+ lessons.`;
    lines.push(`Tagged result: ${emphasized}`);
    lines.push("(Our 'emphasize' tag wraps ES6+ and 'template' in **.)");

    lines.push("");
    lines.push("--- 5. Modern string methods ---");
    const phrase = "  modern JavaScript  ";
    lines.push(`Original: "${phrase}"`);
    lines.push(`trim(): "${phrase.trim()}"`);
    lines.push(`includes('Script'): ${phrase.includes("Script")}`);
    lines.push(`startsWith('modern'): ${phrase.trim().startsWith("modern")}`);
    lines.push(`repeat(2): "${"na ".repeat(2)}batman"`);

    return lines;
  },
};
