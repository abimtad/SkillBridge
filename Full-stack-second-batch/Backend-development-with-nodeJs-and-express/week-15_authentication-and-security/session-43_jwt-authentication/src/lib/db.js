import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// LowDB setup
const adapter = new JSONFile('db.json');
export const db = new Low(adapter, { users: [] });

export async function initDb() {
  await db.read();
  db.data ||= { users: [] };
  // Seed demo users (no password hashing as requested)
  if (!db.data.users.length) {
    db.data.users.push(
      { id: 'u1', username: 'alice', password: 'alicepass', role: 'user' },
      { id: 'u2', username: 'bob', password: 'bobpass', role: 'admin' }
    );
    await db.write();
  }
}
