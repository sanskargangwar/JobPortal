import express from "express";
import Application from "../models/Applications.js";
import Job from "../models/Jobs.js";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

const router = express.Router();

// POST /api/applications/apply
router.post("/apply", authMiddleware, async (req, res) => {
  try {
    const { jobId, coverLetter, expectedSalary, portfolio, linkedIn } =
      req.body;
    const userId = req.user._id;

    const job = await Job.findById(jobId).populate("postedBy"); // populate recruiter
    if (!job) return res.status(404).json({ message: "Job not found" });

    const existing = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existing) return res.status(400).json({ message: "Already applied" });

    const application = new Application({
      job: jobId,
      applicant: userId,
      applicantName: req.user.username,
      applicantEmail: req.user.email,
      applicantSkills: req.user.profile?.skills || [],
      coverLetter,
      expectedSalary,
      portfolio,
      linkedIn,
    });

    await application.save();

    // Update job-seeker
    await User.findByIdAndUpdate(userId, {
      $addToSet: { appliedJobs: jobId },
    });

    // Update recruiter (who posted the job)
    await User.findByIdAndUpdate(job.postedBy._id, {
      $addToSet: { applications: application._id }, // recruiter’s applications array
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/recently-applied", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "job-seeker") {
      return res
        .status(403)
        .json({ message: "Only job-seekers can view this" });
    }

    const applications = await Application.find({
      applicant: req.user._id, // FIXED: was userId
    })
      .populate("job", "title companyName location")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/applications/recruiter
router.get("/recruiter/applications", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res
        .status(403)
        .json({ message: "Only recruiters can view applications" });
    }

    const applications = await Application.find()
      .populate({
        path: "job",
        match: { postedBy: req.user._id }, // ✅ only recruiter’s jobs
        select: "title companyName postedBy",
      })
      .populate("applicant", "username email profile.skills")
      .sort({ createdAt: -1 });

    // ✅ filter out applications where job !== recruiter’s
    const filteredApplications = applications.filter((app) => app.job !== null);

    res.json(filteredApplications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// Update the status /api/applications/recruiter
router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res
        .status(403)
        .json({ message: "Only recruiters can update status" });
    }

    const { status } = req.body;

    const validStatuses = ["applied", "reviewed", "shortlisted", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findById(req.params.id).populate(
      "job"
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // ensure recruiter owns this job
    if (application.job.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this application" });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
