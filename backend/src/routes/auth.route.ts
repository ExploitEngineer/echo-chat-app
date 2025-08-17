import { login, signup, logout } from "../controllers/auth.controller.ts";
import type { Router } from "express";
import express from "express";

const router: Router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);
export default router;
