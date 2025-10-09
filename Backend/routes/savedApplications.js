import express from "express";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/:id/save", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params; // applicationId
    const userId = req.user._id;

    await User.findByIdAndUpdate(userId, {
      $addToSet: { savedApplications: id },
    });

    res.json({ message: "Application saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Unsave an application
router.delete("/:id/save", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    await User.findByIdAndUpdate(userId, {
      $pull: { savedApplications: id },
    });

    res.json({ message: "Application unsaved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all saved applications for recruiter
router.get("/recruiter/saved", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "savedApplications",
      populate: { path: "job applicant" },
    });

    res.json(user.savedApplications || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
