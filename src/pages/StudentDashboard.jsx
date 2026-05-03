import { useEffect, useState } from "react";

function StudentDashboard() {
  const [complaints, setComplaints] = useState([]);

  const userId = localStorage.getItem("userId");

  const fetchComplaints = async () => {
    const res = await fetch(`http://localhost:5001/api/complaints/student/${userId}`);
    const data = await res.json();
    setComplaints(data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;
  const pending = complaints.filter(c => c.status === "Pending").length;

  return (
    <div className="container">
      <h2>Student Dashboard</h2>

      <p>Total Complaints: {total}</p>
      <p>Resolved: {resolved}</p>
      <p>Pending: {pending}</p>
    </div>
  );
}

export default StudentDashboard;