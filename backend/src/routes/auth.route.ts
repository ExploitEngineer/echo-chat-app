import {
  login,
  signup,
  logout,
  updateProfile,
} from "../controllers/auth.controller.ts";
import type { Router } from "express";
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.ts";

const router: Router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

export default router;
