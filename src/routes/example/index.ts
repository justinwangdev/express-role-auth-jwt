import { Request, Response } from "express-serve-static-core";
import {
  verifyToken,
  isAdmin,
  isModeratorOrAdmin,
} from "@/middleware/authJWT";
import { Router } from "express";

const router = Router();

const allAccess = (req: Request, res: Response) => {
  return res.status(200).send("Public Content.");
};
const userBoard = (req: Request, res: Response) => {
  return res.status(200).send("User Content.");
};
const adminBoard = (req: Request, res: Response) => {
  return res.status(200).send("Admin Content.");
};
const moderatorBoard = (req: Request, res: Response) => {
  return res.status(200).send("Mod Content.");
};

router.get("/all", allAccess);

router.get("/user", [verifyToken], userBoard);

router.get("/mod", [verifyToken, isModeratorOrAdmin], moderatorBoard);

router.get("/admin", [verifyToken, isAdmin], adminBoard);

export default router;
