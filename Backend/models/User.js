import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["job-seeker", "recruiter"],
      default: "job-seeker",
      required: true,
    },
    profilePicture: { type: String, default: "" },

    profile: {
      about: { type: String, default: "" },
      skills: [{ type: String, default: [] }],
      experience: { type: String, default: "" },
      location: { type: String, default: "" },
    },

    company: {
      name: { type: String, default: "" },
      website: { type: String, default: "" },
      description: { type: String, default: "" },
    },

    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    savedApplications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
    ],
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    applications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
    ],
    resume: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
