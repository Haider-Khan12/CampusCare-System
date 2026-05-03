import { useState } from "react";
import { Link } from "react-router-dom";

function ComplaintCard({ complaint, onUpdate }) {
  const role = localStorage.getItem("role");

  const [status, setStatus] = useState(complaint.status);
  const [remarks, setRemarks] = useState(complaint.remarks || "");

  const getStatusStyle = (status) => {
    if (status === "Pending") return { color: "orange", fontWeight: "bold" };
    if (status === "In Progress") return { color: "blue", fontWeight: "bold" };
    if (status === "Resolved") return { color: "green", fontWeight: "bold" };
    if (status === "Rejected") return { color: "red", fontWeight: "bold" };
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "20px",
        borderRadius: "10px",
        background: "#fff",
        maxWidth: "500px",
        margin: "0 auto 20px auto",
      }}
    >
      <h4 style={{ textAlign: "center" }}>{complaint.title}</h4>

      <p style={{ textAlign: "center" }}>{complaint.description}</p>

      <p><strong>Category:</strong> {complaint.category}</p>
      <p><strong>Priority:</strong> {complaint.priority}</p>

      <p>
        <strong>Status:</strong>{" "}
        <span style={getStatusStyle(complaint.status)}>
          {complaint.status}
        </span>
      </p>

      
      {role === "admin" && (
        <>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ width: "100%", marginTop: "10px", padding: "6px" }}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Rejected</option>
          </select>

          <input
            placeholder="Add remark"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            style={{ width: "100%", marginTop: "10px", padding: "6px" }}
          />

          <button
            style={{ width: "100%", marginTop: "10px" }}
            onClick={() => onUpdate(complaint._id, status, remarks)}
          >
            Update
          </button>
        </>
      )}

      
      
    </div>
  );
}

export default ComplaintCard;