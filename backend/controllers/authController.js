// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id.toString(), email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

const sanitizeUser = (user) => {
  if (!user) return null;
  const u = typeof user.toObject === "function" ? user.toObject() : { ...user };
  delete u.passwordHash;
  return u;
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    const profilePhoto = req.files?.profilePhoto?.[0]?.path || null;
    const idDocument = req.files?.idDocument?.[0]?.path || null;

    const user = await User.create({
      name,
      email: normalizedEmail,
      phone,
      passwordHash: hash,
      profilePhoto,
      idDocument,
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "User registered",
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error("registerUser error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    return res.status(200).json({
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error("loginUser error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(sanitizeUser(user));
  } catch (err) {
    console.error("getMe error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // Clear cookie if used
    if (res.clearCookie) {
      res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" });
    }
    return res.status(200).json({ message: "Logged out" });
  } catch (err) {
    console.error("logoutUser error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export default {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
};