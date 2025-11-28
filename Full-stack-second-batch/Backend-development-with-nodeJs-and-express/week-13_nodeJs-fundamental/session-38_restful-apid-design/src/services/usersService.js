// In-memory data store for demo purposes
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];
let nextId = users.length + 1;

export function list() {
  return users;
}

export function getById(id) {
  return users.find((u) => u.id === id) || null;
}

export function create(data) {
  const user = { id: nextId++, ...data };
  users.push(user);
  return user;
}

export function replace(id, data) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  const newUser = { id, ...data };
  users[index] = newUser;
  return newUser;
}

export function updatePartial(id, data) {
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  Object.assign(user, data);
  return user;
}

export function remove(id) {
  const start = users.length;
  users = users.filter((u) => u.id !== id);
  return users.length !== start;
}
