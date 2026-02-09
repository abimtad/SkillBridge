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

    const message = `${student} scored ${score} on the ES6+ quiz.`;
    lines.push(message);

    const multiline = `Notes:\n- Template literals handle\n- multiline strings easily.`;
    lines.push(multiline);

    const rawMessage = String.raw`Path stays the same: C:\\dev\\lesson`;
    lines.push(rawMessage);

    const emphasized = emphasize`Use template literals for ES6+ lessons.`;
    lines.push(`Tagged template: ${emphasized}`);

    const phrase = "  modern JavaScript  ";
    lines.push(`trim(): ${phrase.trim()}`);
    lines.push(`includes('Script'): ${phrase.includes("Script")}`);
    lines.push(`startsWith('modern'): ${phrase.trim().startsWith("modern")}`);
    lines.push(`repeat(2): ${"na ".repeat(2)}batman`);

    return lines;
  },
};
