import {
  login,
  signup,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller";
import type { Router } from "express";
import express from "express";
import { protectRoute } from "../middleware/auth.middleware";

const router: Router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;
