import type { Request, Response } from "express-serve-static-core";
import bcrypt from "bcrypt";
import crypto from "crypto";
import prisma from "@/prismaClient";
import jwt from "jsonwebtoken";

const signJwt = (user:any, res:Response) => {
  const jwtToken = jwt.sign(
    { uid: user.uid },
    process.env.JWT_SECRET!,
    { algorithm: "HS256", allowInsecureKeySizes: true, expiresIn: 86400 }
  );

  res.status(200).send({
    uid: user.uid,
    accessToken: jwtToken,
  });
}

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 9);

  const result = await prisma.user
    .create({
      data: {
        uid: crypto.randomUUID(),
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Cannot register user at the moment!" });
    });

  if (result) {
    signJwt(result, res)
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user
    .findUnique({ where: { email: email.toLowerCase() } })
    .catch((err) => {
      console.log("Error: ", err);
    });

  if (!user) {
    return res
      .status(401)
      .json({ message: "Email or password does not match!" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res
      .status(401)
      .json({ message: "Email or password does not match!" });

  signJwt(user, res);
};
