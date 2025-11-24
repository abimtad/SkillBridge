import path from "path";

// Current file path
console.log("Current file absolute:", import.meta.url);

// Joining segments (normalizes separators)
const joined = path.join("folder", "subfolder", "file.txt");
console.log("Joined path:", joined);

// Resolve creates absolute path from cwd
const resolved = path.resolve("folder", "subfolder", "file.txt");
console.log("Resolved absolute:", resolved);

// Parse components
const parsed = path.parse(resolved);
console.log("Parsed components:", parsed);

// Basename / dirname / extname
console.log("Basename:", path.basename(resolved));
console.log("Dirname:", path.dirname(resolved));
console.log("Extension:", path.extname(resolved));

// Relative path between two locations
const rel = path.relative(
  "/Users/example/projects",
  "/Users/example/projects/app/src"
);
console.log("Relative example:", rel);

// Platform specific separator
console.log("Path separator:", path.sep);

// Format from parts
const formatted = path.format({
  dir: "/tmp/demo",
  name: "output",
  ext: ".log",
});
console.log("Formatted path:", formatted);
