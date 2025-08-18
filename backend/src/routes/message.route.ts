import express from "express";
import type { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.ts";
import {
  getUsersForSidebar,
  getMessages,
} from "../controllers/message.controller.ts";

const router: Router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

export default router;
