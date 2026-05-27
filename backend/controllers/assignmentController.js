// controllers/assignmentController.js
import User from "../models/User.js";

export const assignDriver = async (req, res) => {
  try {
    const { userId, customers, date, time, community, tour } = req.body;

    const user = await User.findById(userId);
    if (!user || user.role !== "driver") {
      return res.status(400).json({ message: "User is not a driver" });
    }

    user.assignments.driverAssignment = {
      customers,
      date,
      time,
      community,
      tour,
    };

    await user.save();

    res.json({ success: true, message: "Driver assigned", user });
  } catch (err) {
    console.error("Driver assignment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const assignGuide = async (req, res) => {
  try {
    const { userId, customers, date, time, community, tour } = req.body;

    const user = await User.findById(userId);
    if (!user || user.role !== "guide") {
      return res.status(400).json({ message: "User is not a guide" });
    }

    user.assignments.guideAssignment = {
      customers,
      date,
      time,
      community,
      tour,
    };

    await user.save();

    res.json({ success: true, message: "Guide assigned", user });
  } catch (err) {
    console.error("Guide assignment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};