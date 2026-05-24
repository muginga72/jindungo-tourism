// middleware/uploadMiddleware.js
import multer from "multer";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";

// ensure upload dir exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

export const uploadUserFiles = multer({ storage }).fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "idDocument", maxCount: 1 },
]);

export const uploadTourFiles = multer({ storage }).fields([{ name: "images", maxCount: 5 }]);

export const uploadCommunityFiles = multer({ storage }).fields([{ name: "postImage", maxCount: 1 }]);