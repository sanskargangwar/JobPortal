import express from "express";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Save a job
router.post("/save/:jobId", authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;
    const user = await User.findById(req.user._id);

    if (user.savedJobs.includes(jobId)) {
      return res.status(400).json({ message: "Job already saved" });
    }

    user.savedJobs.push(jobId);
    await user.save();

    res.json({ message: "Job saved successfully", savedJobs: user.savedJobs });
  } catch (err) {
    res.status(500).json({ message: "Error saving job" });
  }
});

//unsave the job
router.post("/unsave/:jobId", authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;
    const user = await User.findById(req.user._id);

    if (!user.savedJobs.includes(jobId)) {
      return res.status(400).json({ message: "Job not saved yet" });
    }

    user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
    await user.save();

    res.json({
      message: "Job removed from saved list",
      savedJobs: user.savedJobs,
    });
  } catch (err) {
    res.status(500).json({ message: "Error removing saved job" });
  }
});
// Get saved jobs
router.get("/my-saved", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("savedJobs");
    res.json(user.savedJobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching saved jobs" });
  }
});
// GET /api/saved-jobs → fetch all saved jobs of logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("savedJobs");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.savedJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// POST /api/saved-jobs/:jobId → save a job
router.post("/:jobId", authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;
    const user = await User.findById(req.user._id);

    if (!user.savedJobs.includes(jobId)) {
      user.savedJobs.push(jobId);
      await user.save();
    }

    res.status(200).json({ message: "Job saved successfully ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// DELETE /api/saved-jobs/:jobId → remove job from saved
router.delete("/:jobId", authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;
    const user = await User.findById(req.user._id);

    user.savedJobs = user.savedJobs.filter(
      (job) => job.toString() !== jobId.toString()
    );
    await user.save();

    res.status(200).json({ message: "Job removed from saved ❌" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
