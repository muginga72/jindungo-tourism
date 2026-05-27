// routes/assignmentRoutes.js
import express from "express";
import { assignDriver, assignGuide } from "../controllers/assignmentController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Only admin can assign
router.post("/assign-driver", authMiddleware, assignDriver);
router.post("/assign-guide", authMiddleware, assignGuide);

export default router;