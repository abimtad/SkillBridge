import * as usersService from "../services/usersService.js";
// import {
//   NotFoundError,
//   ConflictError,
//   BadRequestError
// } from "../errors/ApiError.js";

export async function listUsers(req, res, next) {
  try {
    const users = await usersService.list();
    res.json({data: users, when: req.requestTime});
  } catch (err) {
    next(err);
  }
}

export async function createUser(req, res, next) {
  try {
    const { name, email } = req.body;

    const existing = await usersService.getByEmail(email);
    // if (existing) {
    //   throw new ConflictError("A user with this email already exists");
    // }

    const user = await usersService.create({ name, email, createAt: req.requestTime });

    res.status(201).json({ data: user });
  } catch (err) {
    next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const id = req.params.id;
    const user = await usersService.getById(Number(id));

    if (!user) throw new NotFoundError("User not found");

    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function replaceUser(req, res, next) {
  try {
    const id = req.params.id;
    const user = await usersService.replace(Number(id), req.body || {});

    if (!user) throw new NotFoundError("User not found");

    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const id = req.params.id;
    const user = await usersService.updatePartial(Number(id), req.body || {});
    if (!user) throw new NotFoundError("User not found");

    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  // next(new BadRequestError("Delete user not implemented"));
}
