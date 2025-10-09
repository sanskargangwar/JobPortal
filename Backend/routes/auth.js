import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ================== REGISTER JOB SEEKER ==================
router.post("/register/job-seeker", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "job-seeker", // fixed role
    });

    await newUser.save();
    res.status(201).json({ message: "Job-Seeker registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================== REGISTER RECRUITER ==================
router.post("/register/recruiter", async (req, res) => {
  try {
    const { username, email, password, companyName } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      company: {
        name: companyName,
        website: "",
        description: "",
      },
      role: "recruiter", // fixed role
    });

    await newUser.save();
    res.status(201).json({ message: "Recruiter registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================== LOGIN ==================
router.post("/jobseeker/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ================== LOGIN recruiter ==================
router.post("/recruiter/login", async (req, res) => {
  try {
    const { email, password, companyName } = req.body;

    if (!email || !password || !companyName)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user || user.role === "job-seeker")
      return res.status(404).json({ message: "User not found" });
    if (user.company.name.toLowerCase() !== companyName.toLowerCase())
      return res.status(404).json({ message: "Company not matched" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
