// Named import: import { name } from "..."
// Default import: import defaultName from "..."
import shout, { toTitleCase } from "../lib/strings.js";
import sumAll, { add, formatTotal } from "../lib/math.js";

export const modulesSection = {
  id: "modules",
  title: "Modules (import/export)",
  summary: "Use default and named exports with clear boundaries.",
  tags: ["Modules", "Import", "Export"],
  challenges: [
    "Create a new module that exports a formatter.",
    "Swap a named export to default and fix imports.",
    "Add a barrel file and re-export everything.",
  ],
  run() {
    const lines = [];

    lines.push("--- 1. Named exports (from lib/strings.js) ---");
    lines.push("import { toTitleCase } from '...'");
    const title = toTitleCase("module mindset");
    lines.push(`toTitleCase("module mindset") → "${title}"`);

    lines.push("");
    lines.push("--- 2. Default export (from lib/strings.js) ---");
    lines.push("import shout from '...'  // no curly braces");
    lines.push(`shout("modules keep code tidy") → "${shout("modules keep code tidy")}"`);

    lines.push("");
    lines.push("--- 3. Mix: default + named (from lib/math.js) ---");
    lines.push("import sumAll, { add, formatTotal } from '...'");
    lines.push(`add(3, 9) → ${add(3, 9)}`);
    lines.push(`sumAll(2, 4, 6) → ${sumAll(2, 4, 6)}`);
    lines.push(formatTotal("Quiz", 42));

    lines.push("");
    lines.push("Each section file is a module: we use 'export const section = {...}'");

    return lines;
  },
};
