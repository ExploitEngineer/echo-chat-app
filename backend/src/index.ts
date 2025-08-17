import express from "express";
import type { Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.ts";
import authRoutes from "./routes/auth.route.ts";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (_, res: Response) => {
  res.json({ message: "api" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  connectDB();
});
