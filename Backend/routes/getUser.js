import express from "express";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("savedJobs")
      .populate("appliedJobs")
      .populate("applications");
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("savedJobs appliedJobs postedJobs applications");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ error: "Server error while updating user" });
  }
});

router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("savedJobs")
      .populate("appliedJobs");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      savedJobsCount: user.savedJobs?.length || 0,
      appliedJobsCount: user.appliedJobs?.length || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
