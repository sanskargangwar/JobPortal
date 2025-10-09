import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // snapshot of applicant details (so even if user updates later, recruiter still sees old info)
    applicantName: { type: String },
    applicantEmail: { type: String },
    applicantSkills: [{ type: String }],
    applicantLinkedIn: { type: String },
    applicantPortfolio: { type: String },

    // application details
    coverLetter: { type: String },
    availability: { type: String }, // e.g. "Immediate", "2 weeks notice"
    expectedSalary: { type: Number },
    preferredLocation: { type: String },

    status: {
      type: String,
      enum: ["applied", "reviewed", "shortlisted", "rejected"],
      default: "applied",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
