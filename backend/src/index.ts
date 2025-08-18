import cors from "cors";
import express from "express";
import type { Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.ts";
import authRoutes from "./routes/auth.route.ts";
import messageRoutes from "./routes/message.route.ts";
import cookieParser from "cookie-parser";
import type { CorsOptions } from "cors";

dotenv.config();

const app = express();

const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (_, res: Response) => {
  res.json({ message: "api" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  connectDB();
});
