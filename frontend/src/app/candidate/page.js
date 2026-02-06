"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import JobCard from "@/components/JobCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CandidateDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    api.get("/match/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => {
        console.error(err);
        router.push("/login");
      });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Matched Jobs</h2>

      {/* Upload - Resume Link */}
      <Link href="/candidate/upload">
        Upload / Update Resume
      </Link>

      <br /><br />

      {jobs.length === 0 && <p>No matched jobs found.</p>}

      {jobs.map((item, index) => (
        <JobCard
  key={index}
  job={item.job}
  matchScore={item.matchScore}
  matchedSkills={item.matchedSkills}
/>
      ))}
    </div>
  );
}
