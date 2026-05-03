import { useState } from "react";
import { toast } from "react-toastify";



function SubmitComplaint() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentId = localStorage.getItem("userId");

    const res = await fetch("http://localhost:5001/api/complaints/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        category,
        priority,
        studentId,
      }),
    });

    const data = await res.json();

  if (!res.ok) {
  toast.error(data.message || "Something went wrong");
  return;
}

    toast.success("Complaint submitted");

    setTitle("");
    setDescription("");
    setCategory("");
    setPriority("Low");
  };

  return (
    <div className="container">
      <h2>Submit Complaint</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Hostel">Hostel</option>
          <option value="Transport">Transport</option>
          <option value="Academic">Academic</option>
          <option value="Mess">Mess</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SubmitComplaint;