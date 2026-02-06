"use client";

import { useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const router = useRouter();

  const uploadResume = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resume", file);

    try {
      await api.post("/resumes/upload", formData);
      alert("Resume uploaded successfully");
      router.push("/candidate");
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Upload Resume</h2>

      <form onSubmit={uploadResume}>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <br /><br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
