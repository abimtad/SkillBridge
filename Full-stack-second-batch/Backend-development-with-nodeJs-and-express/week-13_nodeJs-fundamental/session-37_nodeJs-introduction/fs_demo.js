import fs from "fs";
import { promises as fsp } from "fs";
import path from "path";

// Working folder
const baseDir = path.resolve(".");
console.log("Base directory:", baseDir);

// 1. Write a file (async callback style)
fs.writeFile("example.txt", "Hello from fs callback write", (err) => {
  if (err) return console.error("writeFile error", err);
  console.log("example.txt created");

  // 2. Append
  fs.appendFile("example.txt", "\nAppended line", (err2) => {
    if (err2) return console.error("appendFile error", err2);
    console.log("example.txt appended");

    // 3. Read (async)
    fs.readFile("example.txt", "utf8", (err3, data) => {
      if (err3) return console.error("readFile error", err3);
      console.log("Async read contents:\n", data);
    });
  });
});

// 4. Synchronous write/read (avoid in production hot paths)
fs.writeFileSync("sync.txt", "Synchronous content");
const syncContent = fs.readFileSync("sync.txt", "utf8");
console.log("Sync read:", syncContent);

// 5. Using promises (fsp)
async function withPromises() {
  await fsp.writeFile("promise.txt", "Hello from promises");
  const data = await fsp.readFile("promise.txt", "utf8");
  console.log("Promise read:", data);

  // 6. List directory entries
  const entries = await fsp.readdir(".");
  console.log("Directory entries sample:", entries.slice(0, 5));

  // 7. Stat information
  const stat = await fsp.stat("promise.txt");
  console.log("promise.txt size:", stat.size, "bytes");
}
withPromises().catch((e) => console.error(e));

// 8. Streaming large file (simulate by duplicating text)
const largeName = "large_stream.txt";
if (!fs.existsSync(largeName)) {
  const big = Array.from({ length: 1000 }, (_, i) => `Line ${i}`).join("\n");
  fs.writeFileSync(largeName, big);
}
const readStream = fs.createReadStream(largeName, { encoding: "utf8" });
let lineCount = 0;
readStream.on("data", (chunk) => {
  lineCount += chunk.split("\n").length - 1;
});
readStream.on("end", () => {
  console.log("Streamed lines counted ~", lineCount);
});
