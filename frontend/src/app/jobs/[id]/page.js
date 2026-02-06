"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { useParams } from "next/navigation";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (id) {
      api.get(`/jobs/${id}`)
        .then(res => setJob(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  if (!job) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div style={{ padding: 40 }}>
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Experience Level:</strong> {job.experienceLevel}</p>

      <p><strong>Skills Required:</strong></p>
      <ul>
        {job.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
