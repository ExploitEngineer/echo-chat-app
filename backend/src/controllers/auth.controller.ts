import type { Request, Response } from "express";
import User from "../models/user.model.ts";
import { generateToken } from "../lib/utils.ts";
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response) => {
  const {
    body: { fullName, email, password },
  } = req;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are requried" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id.toString(), res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log("Error in signup controller", err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
};

export const login = (req: Request, res: Response) => {
  res.send("login route");
};

export const logout = (req: Request, res: Response) => {
  res.send("logout route");
};
