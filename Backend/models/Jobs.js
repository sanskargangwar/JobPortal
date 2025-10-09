import mongoose from "mongoose";
const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    role: String, // e.g. "AI Engineer"
    companyName: String,
    location: String,
    experience: String,
    salary: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // recruiter
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
