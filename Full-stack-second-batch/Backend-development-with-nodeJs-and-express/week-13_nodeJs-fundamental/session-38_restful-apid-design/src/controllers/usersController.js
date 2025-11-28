import * as usersService from "../services/usersService.js";

export function listUsers(req, res) {
  res.json(usersService.list());
}

export function createUser(req, res) {
  const user = usersService.create(req.body || {});
  res.status(201).json(user);
}

export function getUser(req, res) {
  const id = parseInt(req.params.id, 10);
  const user = usersService.getById(id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}

export function replaceUser(req, res) {
  const id = parseInt(req.params.id, 10);
  const user = usersService.replace(id, req.body || {});
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}

export function updateUser(req, res) {
  const id = parseInt(req.params.id, 10);
  const user = usersService.updatePartial(id, req.body || {});
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}

export function deleteUser(req, res) {
  const id = parseInt(req.params.id, 10);
  const removed = usersService.remove(id);
  if (!removed) return res.status(404).json({ error: "User not found" });
  res.status(204).send();
}
