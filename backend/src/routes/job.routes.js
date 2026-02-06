import express from "express";
import Job from "../models/Job.js";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";

const router = express.Router();

// Create Job
router.post("/", auth, role("employer"), async (req, res) => {
  const job = await Job.create({
    ...req.body,
    employerId: req.user.id
  });
  res.json(job);
});

// Get Jobs
router.get("/", async (_, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// Get Job by ID
router.get("/:id", async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.json(job);
});

// Update Job
router.put("/:id", auth, role("employer"), async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(job);
});

// Delete Job
router.delete("/:id", auth, role("employer"), async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted" });
});

export default router;
