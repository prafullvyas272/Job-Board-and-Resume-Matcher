"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import Link from "next/link";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>All Jobs</h2>

      {jobs.length === 0 && <p>No jobs available.</p>}

      {jobs.map(job => (
        <div
          key={job._id}
          style={{
            border: "1px solid #444",
            padding: 16,
            marginBottom: 12,
            borderRadius: 6,
          }}
        >
          <h3>{job.title}</h3>
          <p>{job.company} - {job.location}</p>

          <Link href={`/jobs/${job._id}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
