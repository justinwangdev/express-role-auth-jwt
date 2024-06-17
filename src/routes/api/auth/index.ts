import express from "express";
import { register, login } from "@/controller/authController";
import { verifyRegister } from "@/middleware/verifyRegister";
import { isLogin } from "@/middleware/authJWT";

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/register", verifyRegister, register);
router.post("/login", login);
router.get("/verify", isLogin)

export default router;
