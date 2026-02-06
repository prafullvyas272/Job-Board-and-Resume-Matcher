"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

export default function EmployerDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    skills: "",
  });

  // fetch jobs
  const loadJobs = async () => {
    const res = await api.get("/jobs");
    setJobs(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    loadJobs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createJob = async (e) => {
    e.preventDefault();

    try {
      await api.post("/jobs", {
        ...form,
        skills: form.skills.split(",").map(s => s.trim()),
        experienceLevel: "Mid",
      });

      alert("Job created");
      setForm({ title: "", company: "", location: "", skills: "" });
      loadJobs();
    } catch (err) {
      alert("Job creation failed");
      console.error(err);
    }
  };

  const deleteJob = async (id) => {
    await api.delete(`/jobs/${id}`);
    loadJobs();
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Employer Dashboard</h2>

      <h3>Create Job</h3>
      <form onSubmit={createJob}>
        <input
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
          required
        /><br /><br />

        <button type="submit">Create Job</button>
      </form>

      <hr />

      <h3>Your Jobs</h3>

      {jobs.map(job => (
        <div
          key={job._id}
          style={{
            border: "1px solid #444",
            padding: 16,
            marginBottom: 10,
            borderRadius: 6
          }}
        >
          <h4>{job.title}</h4>
          <p>{job.company} – {job.location}</p>
          <button onClick={() => deleteJob(job._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
