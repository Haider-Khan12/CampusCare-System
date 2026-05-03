import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role) {
      navigate("/dashboard");
    }
  }, [role]);

  return (
    <div className="container">
      <h1>CampusCare System</h1>

      <p style={{ margin: "15px 0" }}>
        A platform for students to submit and track complaints efficiently.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
  );
}

export default Home;