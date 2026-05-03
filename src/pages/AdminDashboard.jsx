import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ComplaintCard from "../components/ComplaintCard";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/complaints");
      const data = await res.json();
      setComplaints(data);
    } catch (error) {
      toast.error("Failed to load complaints");
    }
  };

  const handleUpdate = async (id, status, remarks) => {
    try {
      const res = await fetch(`http://localhost:5001/api/complaints/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, remarks }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Update failed");
        return;
      }

      toast.success("Updated successfully");
      fetchComplaints();
    } catch (error) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const filteredComplaints = complaints
    .filter((c) => !statusFilter || c.status === statusFilter)
    .filter((c) => !categoryFilter || c.category === categoryFilter)
    .filter((c) => !priorityFilter || c.priority === priorityFilter);

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <p>Total Complaints: {total}</p>
      <p>Pending: {pending}</p>
      <p>Resolved: {resolved}</p>

      {/* Filters */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Rejected</option>
        </select>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Category</option>
          <option>Hostel</option>
          <option>Transport</option>
          <option>Academic</option>
          <option>Mess</option>
          <option>Other</option>
        </select>

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="">All Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      
      {filteredComplaints.map((c) => (
        <ComplaintCard key={c._id} complaint={c} onUpdate={handleUpdate} />
      ))}
    </div>
  );

}

export default AdminDashboard;