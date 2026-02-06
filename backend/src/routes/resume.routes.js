import express from "express";
import multer from "multer";
import fs from "fs";

// ✅ Import ONLY the parser (not the test loader)
import pdfParse from "pdf-parse/lib/pdf-parse.js";

import Resume from "../models/Resume.js";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import { extractSkills } from "../utils/skillExtractor.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/upload",
  auth,
  role("candidate"),
  upload.single("resume"),
  async (req, res) => {
    try {
      const buffer = fs.readFileSync(req.file.path);
      const data = await pdfParse(buffer);

      const skills = extractSkills(data.text);

      const resume = await Resume.create({
        candidateId: req.user.id,
        filePath: req.file.path,
        skills
      });

      res.json(resume);
    } catch (error) {
      console.error("PDF PARSE ERROR:", error);
      res.status(500).json({ message: "Resume parsing failed" });
    }
  }
);

router.get("/:id", auth, role("candidate"), async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  res.json(resume);
});

export default router;
