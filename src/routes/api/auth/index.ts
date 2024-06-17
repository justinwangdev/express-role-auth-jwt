import express from "express";
import { register, login } from "@/controller/authController";
import { verifyRegister } from "@/middleware/verifyRegister";

const router = express.Router();

router.post("/register", verifyRegister, register);
router.post("/login", login);

export default router;
