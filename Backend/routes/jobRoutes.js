import express from "express";
import Job from "../models/Jobs.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/jobs  → recruiter posts a job
router.post("/post-job", authMiddleware, async (req, res) => {
  try {
    const recruiter = req.user; // comes from authMiddleware
    const {
      title,
      description,
      role,
      companyName,
      location,
      experience,
      salary,
    } = req.body;

    if (recruiter.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can post jobs" });
    }

    // create new job
    const newJob = new Job({
      title,
      description,
      role,
      companyName,
      location,
      experience,
      salary,
      postedBy: recruiter._id,
    });

    const savedJob = await newJob.save();

    // update recruiter’s postedJobs
    recruiter.postedJobs.push(savedJob._id);
    await recruiter.save();

    res
      .status(201)
      .json({ message: "Job posted successfully ✅", job: savedJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /api/jobs → get all available jobs (for job-seekers)
router.get("/all-jobs", async (req, res) => {
  try {
    const jobs = await Job.find().populate(
      "postedBy",
      "username email company"
    );
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /api/jobs/my → recruiter’s posted jobs
router.get("/my-jobs", authMiddleware, async (req, res) => {
  try {
    const recruiter = req.user;

    if (recruiter.role !== "recruiter") {
      return res
        .status(403)
        .json({ message: "Only recruiters can view their jobs" });
    }

    // populate posted jobs with applicant count
    const jobs = await Job.find({ postedBy: recruiter._id })
      .populate("postedBy", "username email") // optional: recruiter details
      .lean();

    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this job" });
    }

    await job.deleteOne();
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
