import express, { application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import savedJobsRoutes from "./routes/savedJobs.js";
import userRoutes from "./routes/getUser.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applications.js";
import savedApplications from "./routes/savedApplications.js";
import resumeRoutes from "./routes/uploadResume.js";
dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: "https://jobportal-m9c9.onrender.com/",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.use("/api/saved-jobs", savedJobsRoutes);
app.use("/api/saved-applications", savedApplications);
app.use("/api/resume", resumeRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "JobX",
  })
  .then(() =>
    app.listen(5000, () => console.log("Server running on port 5000"))
  )
  .catch((err) => console.error(err));
