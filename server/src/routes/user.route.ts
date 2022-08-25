import express from "express";
import { login, signup } from "controllers/auth.controller";
import isAllFieldsEnter from "../middlewares/isAllFieldsEnter.middleware";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", isAllFieldsEnter("email", "password"), login);
export default router;
