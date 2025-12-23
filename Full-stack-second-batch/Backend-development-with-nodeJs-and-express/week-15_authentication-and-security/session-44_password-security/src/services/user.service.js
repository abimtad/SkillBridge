import { db } from '../lib/db.js';

export async function findByUsername(username) {
  await db.read();
  return db.data.users.find(u => u.username === username) || null;
}
