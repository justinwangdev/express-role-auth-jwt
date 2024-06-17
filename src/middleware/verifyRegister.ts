import { Request, Response, NextFunction } from "express-serve-static-core";
import prisma from "../prismaClient";

export const verifyRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const emailExists = await prisma.user
    .findUnique({ where: { email: req.body.email.toLowerCase() } })
    .catch((err) => {
      console.log("Error: ", err);
    });

  if (emailExists) {
    return res.status(400).json({ message: "The Email is Taken!" });
  }

  next();
};
