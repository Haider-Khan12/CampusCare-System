import { useEffect, useState } from "react";
import ComplaintCard from "../components/ComplaintCard";
import { Link } from "react-router-dom";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPriority, setNewPriority] = useState("");

  const userId = localStorage.getItem("userId");

  const fetchComplaints = async () => {
    const res = await fetch(
      `http://localhost:5001/api/complaints/student/${userId}`
    );
    const data = await res.json();
    setComplaints(data);
  };

  useEffect(() => {
    if (userId) fetchComplaints();
  }, [userId]);

  const startEdit = (c) => {
    setEditingId(c._id);
    setNewTitle(c.title);
    setNewDesc(c.description);
    setNewCategory(c.category);
    setNewPriority(c.priority);
  };

  const handleUpdate = async (id) => {
    const res = await fetch(`http://localhost:5001/api/complaints/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDesc,
        category: newCategory,
        priority: newPriority,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Update failed");
      return;
    }

    setEditingId(null);
    fetchComplaints();
  };

  return (
    <div className="container">
      <h2>My Complaints</h2>

      {complaints.length === 0 && <p>No complaints yet</p>}

      {complaints.map((c) => (
        <div key={c._id} style={{ marginBottom: "15px" }}>
          
          {editingId === c._id ? (
            <div style={{ border: "1px solid #ccc", padding: "10px" }}>
              
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Title"
              />

              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Description"
              />

              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                <option>Hostel</option>
                <option>Transport</option>
                <option>Academic</option>
                <option>Mess</option>
                <option>Other</option>
              </select>

              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <button onClick={() => handleUpdate(c._id)}>Save</button>
            </div>
          ) : (
            <>
              {/* CLEAN CARD */}
              <ComplaintCard complaint={c} />

              {/* ACTION BUTTONS */}
              {c.status === "Pending" && (
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button style={{ flex: 1 }} onClick={() => startEdit(c)}>
                    Edit
                  </button>

                  <Link to={`/chat/${c._id}`} style={{ flex: 1 }}>
                    <button style={{ width: "100%" }}>
                      Open Chat
                    </button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyComplaints;