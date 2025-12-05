import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";

let dbPromise;

export async function getDb() {
  if (!dbPromise) {
    dbPromise = (async () => {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const dataDir = path.join(__dirname, "../../data");
      await fs.mkdir(dataDir, { recursive: true });
      const file = path.join(dataDir, "db.json");

      const adapter = new JSONFile(file);
      const defaultData = { users: [], nextId: 1 };
      const db = new Low(adapter, defaultData);

      // Ensure the file is read and defaults are set
      await db.read();
      db.data ||= { users: [], nextId: 1 };

      return db;
    })();
  }
  return dbPromise;
}
