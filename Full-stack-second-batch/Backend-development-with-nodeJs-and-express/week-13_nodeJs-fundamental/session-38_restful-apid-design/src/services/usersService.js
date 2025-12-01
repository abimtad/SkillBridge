import { getDb } from "../db/lowdb.js";

export async function list() {
  const db = await getDb();
  await db.read();
  return db.data.users;
}

export async function getById(id) {
  const db = await getDb();
  await db.read();
  return db.data.users.find((u) => u.id === id) || null;
}

export async function create(data) {
  const db = await getDb();
  await db.read();
  const id = db.data.nextId || 1;
  const user = { id, ...data };
  db.data.users.push(user);
  db.data.nextId = id + 1;
  await db.write();
  return user;
}

export async function replace(id, data) {
  const db = await getDb();
  await db.read();
  const index = db.data.users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  const newUser = { id, ...data };
  db.data.users[index] = newUser;
  await db.write();
  return newUser;
}

export async function updatePartial(id, data) {
  const db = await getDb();
  await db.read();
  const user = db.data.users.find((u) => u.id === id);
  if (!user) return null;
  Object.assign(user, data);
  await db.write();
  return user;
}

export async function remove(id) {
  const db = await getDb();
  await db.read();
  const start = db.data.users.length;
  db.data.users = db.data.users.filter((u) => u.id !== id);
  const changed = db.data.users.length !== start;
  if (changed) {
    await db.write();
  }
  return changed;
}
