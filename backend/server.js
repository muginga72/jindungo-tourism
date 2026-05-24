// server/server.js
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

// Create the app
const app = express();
// Core middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

// Static uploads folder
const __dirname = process.cwd();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Jindungo API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));