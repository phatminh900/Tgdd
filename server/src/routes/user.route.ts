import express from "express";
import {
  login,
  signup,
  forgotPassword,
  resetPassword,
} from "controllers/auth.controller";
import isAllFieldsEnter from "../middlewares/isAllFieldsEnter.middleware";
import { protect } from "middlewares/protect.middleware";
import User from "models/user.model";
import { updateMe } from "controllers/user.controller";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", isAllFieldsEnter("email", "password"), login);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updateMe", protect, updateMe);
export default router;
