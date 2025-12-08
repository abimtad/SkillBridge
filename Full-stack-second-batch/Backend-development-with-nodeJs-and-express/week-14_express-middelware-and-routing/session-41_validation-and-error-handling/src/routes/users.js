import express from "express";
import {
  updateUser,
  listUsers,
  getUser,
  createUser,
  replaceUser
} from "../controllers/usersController.js";
import validateRequest from "../middelwares/validateRequest.js";
import {
  createUserValidation,
  replaceUserValidation,
  updateUserValidation,
  getUserValidation
} from "../middelwares/validators/userValidators.js";

const router = express.Router();

router.get("/", listUsers);
router.get("/:id", getUserValidation, validateRequest, getUser);
router.post("/create", createUserValidation, validateRequest, createUser);
router.put("/:id", replaceUserValidation, validateRequest, replaceUser);
router.patch("/:id", updateUserValidation, validateRequest, updateUser);
// router.delete("/:id", );

export default router;