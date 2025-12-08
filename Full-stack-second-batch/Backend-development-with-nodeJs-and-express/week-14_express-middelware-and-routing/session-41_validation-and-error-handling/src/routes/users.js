import express from "express";
import {
  updateUser,
  listUsers,
  getUser,
  createUser,
  replaceUser
} from "../controllers/usersController.js";

import requestTime from "../middelwares/requestTime.js"
import {createUserValidation} from "../middelwares/validators/userValidators.js"
import validateRequest from "../middelwares/validateRequest.js"



const router = express.Router();

router.get("/", requestTime, listUsers);
router.get("/:id",  getUser);
router.post("/create",createUserValidation, validateRequest,createUser);
router.put("/:id", replaceUser);
router.patch("/:id", updateUser);
// router.delete("/:id", );

export default router;