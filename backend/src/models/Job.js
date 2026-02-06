import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  company: String,
  location: String,
  description: String,
  skills: [String],
  experienceLevel: String,
  salaryRange: String
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
