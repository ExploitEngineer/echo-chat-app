import type { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userId: string, res: Response) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 1000, // Milli Seconds
    httpOnly: true, // prevent XSS attacks cross-site-scripting attacks
    sameSite: "strict", // CSRF attacks cross-stie request forgery attcks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
