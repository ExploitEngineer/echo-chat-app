import express from "express";
import type { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller";

const router: Router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;
