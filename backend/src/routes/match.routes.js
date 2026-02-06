import express from "express";
import Job from "../models/Job.js";
import Resume from "../models/Resume.js";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";

const router = express.Router();

router.get("/jobs", auth, role("candidate"), async (req, res) => {
  try {
    const resume = await Resume.findOne({ candidateId: req.user.id });

    if (!resume) {
      return res.json([]);
    }

    // Convert resume skills to lowercase once
    const resumeSkills = resume.skills.map(skill =>
      skill.toLowerCase().trim()
    );

    const jobs = await Job.find();

    const matched = jobs
      .map(job => {
        // Convert job skills to lowercase
        const jobSkills = job.skills.map(skill =>
          skill.toLowerCase().trim()
        );

        const matchingSkills = jobSkills.filter(skill =>
          resumeSkills.includes(skill)
        );

        const score = jobSkills.length
          ? Math.round((matchingSkills.length / jobSkills.length) * 100)
          : 0;

        return {
          job,
          matchScore: score,
          matchedSkills: matchingSkills // bonus info
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);

    res.json(matched);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Matching failed" });
  }
});

export default router;
