// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const tokenFromHeader = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
    const token = tokenFromHeader || req.cookies?.token || null;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const secret = process.env.JWT_SECRET || "dev_secret_change_me";
    const decoded = jwt.verify(token, secret);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach minimal user info to req.user
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role || "customer" };

    next();
  } catch (err) {
    console.error("authMiddleware error:", err);
    return res.status(401).json({ message: "Authentication failed", error: err.message });
  }
};