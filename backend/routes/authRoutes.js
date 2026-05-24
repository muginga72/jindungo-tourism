// backend/routes/authRoutes.js
import express from "express";
import { registerUser, loginUser, logoutUser, getMe } from "../controllers/authController.js";
import { uploadUserFiles } from "../middleware/uploadMiddleware.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", uploadUserFiles, registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/getMe", authMiddleware, getMe);

export default router;