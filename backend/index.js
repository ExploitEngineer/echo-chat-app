import express from "express";
import dotenv from "dotenv";

dotenv.config();

app.use("/api/auth", authRoutes);

const app = express();

app.get("/", (_, res) => {
  res.json({ message: "api" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
