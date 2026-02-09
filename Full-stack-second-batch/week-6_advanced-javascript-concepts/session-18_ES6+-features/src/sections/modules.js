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

    const title = toTitleCase("module mindset");
    lines.push(`Named export: ${title}`);

    lines.push(`Default export: ${shout("modules keep code tidy")}`);

    lines.push(`add(3, 9): ${add(3, 9)}`);
    lines.push(`sumAll(2, 4, 6): ${sumAll(2, 4, 6)}`);
    lines.push(formatTotal("Quiz", 42));

    return lines;
  },
};
