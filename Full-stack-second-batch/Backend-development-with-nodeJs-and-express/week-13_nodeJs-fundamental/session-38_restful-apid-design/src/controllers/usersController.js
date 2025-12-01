import * as usersService from "../services/usersService.js";

export async function listUsers(req, res, next) {
  try {
    const users = await usersService.list();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function createUser(req, res, next) {
  try {
    const user = await usersService.create(req.body || {});
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await usersService.getById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function replaceUser(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await usersService.replace(id, req.body || {});
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await usersService.updatePartial(id, req.body || {});
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const removed = await usersService.remove(id);
    if (!removed) return res.status(404).json({ error: "User not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
