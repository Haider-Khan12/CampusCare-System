import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="navbar">
      {!role && (
        <>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {role === "student" && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/submit-complaint">Submit Complaint</Link>
          <Link to="/my-complaints">My Complaints</Link>
          <Link to="/notifications">Notifications</Link>

          <span
            onClick={handleLogout}
            style={{
              cursor: "pointer",
              backgroundColor: "#dc3545",
              color: "white",
              padding: "6px 12px",
              borderRadius: "5px",
              marginLeft: "10px"
            }}
          >
            Logout
          </span>
        </>
      )}

      {role === "admin" && (
        <>
          <Link to="/dashboard">Admin Dashboard</Link>
          

          <span
            onClick={handleLogout}
            style={{
              cursor: "pointer",
              backgroundColor: "#dc3545",
              color: "white",
              padding: "6px 12px",
              borderRadius: "5px",
              marginLeft: "10px"
            }}
          >
            Logout
          </span>
        </>
      )}
    </div>
  );
}

export default Navbar;