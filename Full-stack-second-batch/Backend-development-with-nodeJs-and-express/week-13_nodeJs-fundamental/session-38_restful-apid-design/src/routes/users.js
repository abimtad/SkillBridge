import express from "express";
import {
  listUsers,
  createUser,
  getUser,
  replaceUser,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/", listUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id", replaceUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
