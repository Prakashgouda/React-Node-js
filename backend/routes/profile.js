const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

const router = express.Router();

// GET /api/profile
router.get("/profile", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/profile - update name, email, and/or password
router.put("/profile", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, password } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (email) {
      const normalized = email.toLowerCase().trim();
      const existing = await User.findOne({
        email: normalized,
        _id: { $ne: userId },
      });
      if (existing)
        return res.status(409).json({ message: "Email already in use" });
      updates.email = normalized;
    }
    if (password) {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters." });
      }
      const hashed = await bcrypt.hash(password, 10);
      updates.password = hashed;
    }

    const updated = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");
    if (!updated) return res.status(404).json({ message: "User not found" });

    // Re-issue token so client can refresh name/email in token payload
    const token = jwt.sign(
      { id: updated._id, email: updated.email, name: updated.name },
      JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({ user: updated, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
