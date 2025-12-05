import express from "express";
import {
  updateUser,
  listUsers,
  getUser,
  createUser,
replaceUser
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/", listUsers);
router.get("/:id", getUser);
router.post("/create", createUser);
router.put("/:id", replaceUser);
router.patch("/:id",updateUser );
// router.delete("/:id", );

export default router;