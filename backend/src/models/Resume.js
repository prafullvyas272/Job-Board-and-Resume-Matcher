import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  filePath: String,
  skills: [String]
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);
