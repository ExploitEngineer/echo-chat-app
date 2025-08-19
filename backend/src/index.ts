import cors from "cors";
import express from "express";
import type { Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import cookieParser from "cookie-parser";
import type { CorsOptions } from "cors";
import { app, server } from "./lib/socket";
import path from "path";

dotenv.config();

const __dirname = path.resolve();

const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.get("/", (_, res: Response) => {
  res.json({ message: "api" });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  connectDB();
});
