import multer from "multer";
import express from "express";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authmiddleware.js";
const router = express.Router();

// Configure Multer to store files in memory
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Route to upload resume
router.post(
  "/upload-resume",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      const user = req.user; // ✅ use the authenticated user
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.role !== "job-seeker") {
        return res
          .status(403)
          .json({ error: "Only job seekers can upload resumes" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Convert file to Base64 and store in resume field
      const base64Resume = req.file.buffer.toString("base64");
      user.resume = `data:application/pdf;base64,${base64Resume}`;
      await user.save();

      res.status(200).json({ message: "Resume uploaded successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Route to get user data
router.get("/public/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).select("resume role username");
  if (!user) return res.status(404).json({ error: "User not found" });
  res
    .status(200)
    .json({ resume: user.resume, role: user.role, username: user.username });
});

export default router;
