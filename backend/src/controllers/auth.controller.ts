import type { Request, Response } from "express";
import User from "../models/user.model.ts";
import { generateToken } from "../lib/utils.ts";
import bcrypt from "bcrypt";
import cloudinary from "../lib/cloudinary.ts";

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

export const login = async (req: Request, res: Response) => {
  const {
    body: { email, password },
  } = req;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id.toString(), res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log("Error in login controller", err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const logout = (_: any, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    if (err instanceof Error) {
      console.log("Error in logout controller", err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const {
      body: { profilePic },
    } = req;
    const userId = (req as any).user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true },
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log("error in update profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    res.status(200).json(user);
  } catch (err) {
    if (err instanceof Error) {
      console.log("Error in checkAuth controller", err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
