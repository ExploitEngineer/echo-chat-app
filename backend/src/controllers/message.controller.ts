import type { Request, Response } from "express";
import User from "../models/user.model.ts";
import Message from "../models/message.model.ts";

export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = (req as any).user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (err) {
    if (err instanceof Error) {
      console.log("Error in getUsersForSidebar: ", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const {
      params: { id: userToChatId },
    } = req;

    const myId = (req as any).user._id;

    const messages = await Message.find({
      $or: [
        { myId: myId, receiverId: userToChatId },
        { myId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (err) {
    if (err instanceof Error) {
      console.log("Error in getMessages controller: ", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
