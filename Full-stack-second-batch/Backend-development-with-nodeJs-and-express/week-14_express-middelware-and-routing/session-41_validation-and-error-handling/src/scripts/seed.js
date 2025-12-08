import { getDb } from "../db/lowdb.js";

async function run() {
  const db = await getDb();
  await db.read();

  if (!Array.isArray(db.data.users)) {
    db.data.users = [];
  }

  if ((db.data.users?.length || 0) > 0) {
    console.log(
      "Seed skipped: users already present (",
      db.data.users.length,
      ")"
    );
    return;
  }

  const users = [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
    { name: "Charlie", email: "charlie@example.com" },
  ];

  let nextId = db.data.nextId || 1;
  for (const u of users) {
    db.data.users.push({ id: nextId++, ...u });
  }
  db.data.nextId = nextId;
  await db.write();
  console.log("Seeded", users.length, "users.");
}

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
