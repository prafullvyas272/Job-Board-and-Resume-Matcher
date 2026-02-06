export default function JobCard({ job, matchScore, matchedSkills }) {
  return (
    <div
      style={{
        border: "1px solid #444",
        padding: 16,
        marginBottom: 12,
        borderRadius: 6,
      }}
    >
      <h3>{job.title}</h3>

      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>

      <p>
        <strong>Match:</strong>{" "}
        <span style={{ color: matchScore >= 50 ? "green" : "orange" }}>
          {matchScore}%
        </span>
      </p>

      {matchedSkills && matchedSkills.length > 0 && (
        <p>
          <strong>Matched Skills:</strong>{" "}
          {matchedSkills.join(", ")}
        </p>
      )}
    </div>
  );
}
