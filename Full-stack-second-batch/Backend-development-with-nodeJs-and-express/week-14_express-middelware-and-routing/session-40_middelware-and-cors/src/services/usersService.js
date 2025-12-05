import { getDb } from "../db/lowdb.js";

const db = await getDb();
await db.read();

export async function list() {
  return db.data.users;
}

export async function getById(id) {
  return db.data.users.find((u) => u.id === id) || null;
}

export async function create(data) {
  try {
    let id = db.data.nextId || 1;

    const user = { id, ...data};

    db.data.users.push(user);
    db.data.nextId = id + 1;

    await db.write();

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function replace(id, data) {
  const index = db.data.users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  const newUser = { id, ...data };

  db.data.users[index] = newUser;
  await db.write();

  return newUser;
}

export async function updatePartial(id, data) {
  const user = db.data.users.find((u) => u.id === id);

  if (!user) return null;

  Object.assign(user, data);

  await db.write();

  return user;
}

export function remove(id) {}
