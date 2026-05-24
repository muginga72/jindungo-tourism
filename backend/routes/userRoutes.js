// backend/routes/userRoute.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { getUser, updateUser, removeUserFiles, deleteUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

const UPLOAD_BASE = process.env.UPLOAD_DIR || "uploads";
const USERS_UPLOAD_DIR = path.join(UPLOAD_BASE, "users");
if (!fs.existsSync(USERS_UPLOAD_DIR)) {
  fs.mkdirSync(USERS_UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.params?.id || req.user?.id || "temp";
    const dest = path.join(USERS_UPLOAD_DIR, String(userId));
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = crypto.randomBytes(12).toString("hex");
    cb(null, `${name}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedImage = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const allowedId = [...allowedImage, "application/pdf", "image/tiff"];
  if (file.fieldname === "profilePhoto") {
    return allowedImage.includes(file.mimetype) ? cb(null, true) : cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Invalid profile photo type"));
  }
  if (file.fieldname === "idDocument") {
    return allowedId.includes(file.mimetype) ? cb(null, true) : cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Invalid id document type"));
  }
  cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Unexpected field"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024, files: 2 },
});

router.get("/getMe", authMiddleware, getUser);
router.get("/:id", authMiddleware, getUser);

router.put(
  "/getMe",
  authMiddleware,
  upload.fields([{ name: "profilePhoto", maxCount: 1 }, { name: "idDocument", maxCount: 1 }]),
  updateUser
);

router.put(
  "/:id",
  authMiddleware,
  upload.fields([{ name: "profilePhoto", maxCount: 1 }, { name: "idDocument", maxCount: 1 }]),
  updateUser
);

router.delete("/:id/files", authMiddleware, removeUserFiles);
router.delete("/:id", authMiddleware, deleteUser);

export default router;