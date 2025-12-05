import * as usersService from "../services/usersService.js";

export async function listUsers(req, res, next) {
  try {
    const users = await usersService.list();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function createUser(req, res) {
  try {
    console.log(req.body);
    const { name, email } = req.body;
    console.log(req.body);

    if (!name || !email) {
      throw new Error({ status: 400, message: "Bad request" });
    }

    const user = await usersService.create({ name, email, createAt: req.requestTime });
    console.log("user:", user);

    res.status(201).json({ data: user });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
}

export async function getUser(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await usersService.getById(id);

    if (!id)
      return res.status(404).json({ error: "provide the correct parameter" });

    console.log("id: ", id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function replaceUser(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    console.log(req.body);
    const user = await usersService.replace(id, req.body || {});
    console.log("user: ", user);

    if (!user) return res.status(404).json({ error: "user not found" });

    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await usersService.updatePartial(id, req.body || {});
    if (!user) return res.status(404).json({ error: "user not found" });

    res.json(user);
  } catch (err) {
    next(err);
  }
}

export function deleteUser(req, res) {}
