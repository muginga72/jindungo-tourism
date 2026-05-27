// controllers/userController.js
import fs from "fs";
import path from "path";
import User from "../models/User.js";

const safeUnlink = (filePath) => {
  if (!filePath) return;
  try {
    const resolved = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    if (fs.existsSync(resolved)) {
      fs.unlinkSync(resolved);
    }
  } catch (err) {
    console.warn("safeUnlink warning:", err?.message || err);
  }
};

const sanitizeUser = (user) => {
  if (!user) return null;
  const u = typeof user.toObject === "function" ? user.toObject() : { ...user };
  delete u.passwordHash;
  return u;
};

export const getUser = async (req, res) => {
  try {
    const id = req.params?.id || req.user?.id;
    if (!id) return res.status(400).json({ message: "User id is required" });

    const user = await User.findById(id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ user: sanitizeUser(user) });
  } catch (err) {
    console.error("getUser error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params?.id || req.user?.id;
    if (!userId) return res.status(400).json({ message: "User id is required" });

    // Only allow users to update their own profile unless admin
    if (req.user && req.user.id && req.user.id !== userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { name, phone } = req.body || {};

    const update = {};
    if (typeof name === "string" && name.trim() !== "") update.name = name.trim();
    if (typeof phone === "string") update.phone = phone.trim();

    const profileFile = req.files?.profilePhoto?.[0] || (req.file && req.file.fieldname === "profilePhoto" ? req.file : null);
    const idFile = req.files?.idDocument?.[0] || (req.file && req.file.fieldname === "idDocument" ? req.file : null);

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If new profile photo uploaded, remove old file and set new path
    if (profileFile) {
      const newPath = profileFile.path || (profileFile.filename ? path.join(profileFile.destination || "", profileFile.filename) : null);
      if (newPath) {
        safeUnlink(user.profilePhoto);
        update.profilePhoto = newPath;
      }
    }

    // If new id document uploaded, remove old file and set new path
    if (idFile) {
      const newPath = idFile.path || (idFile.filename ? path.join(idFile.destination || "", idFile.filename) : null);
      if (newPath) {
        safeUnlink(user.idDocument);
        update.idDocument = newPath;
        update.idUploadedAt = new Date();
        update.idVerified = false;
      }
    }

    Object.assign(user, update);
    await user.save();

    return res.status(200).json({
      message: "Profile updated",
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error("updateUser error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const removeUserFiles = async (req, res) => {
  try {
    const userId = req.params?.id || req.user?.id;
    if (!userId) return res.status(400).json({ message: "User id is required" });

    if (req.user && req.user.id && req.user.id !== userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const removeProfile = req.query?.profilePhoto === "true";
    const removeId = req.query?.idDocument === "true";

    if (!removeProfile && !removeId) {
      return res.status(400).json({ message: "Specify file(s) to remove via query params" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const updates = {};
    if (removeProfile && user.profilePhoto) {
      safeUnlink(user.profilePhoto);
      updates.profilePhoto = null;
    }
    if (removeId && user.idDocument) {
      safeUnlink(user.idDocument);
      updates.idDocument = null;
      updates.idUploadedAt = null;
      updates.idVerified = false;
    }
    Object.assign(user, updates);
    await user.save();

    return res.status(200).json({ message: "Files removed", user: sanitizeUser(user) });
  } catch (err) {
    console.error("removeUserFiles error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params?.id;
    if (!userId) return res.status(400).json({ message: "User id is required" });

    // Only allow admins or the user themselves
    if (req.user && req.user.id && req.user.id !== userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // remove files
    safeUnlink(user.profilePhoto);
    safeUnlink(user.idDocument);
    await user.remove();

    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error("deleteUser error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      assignments: user.assignments || {},
      bookings: [],             // add real data later
      recommendedTours: [],     // add real data later
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server error loading dashboard" });
  }
};

export default {
  getUser,
  updateUser,
  removeUserFiles,
  deleteUser,
  getUserDashboard,
};