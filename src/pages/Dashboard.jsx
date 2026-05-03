import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";

function Dashboard() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");

    if (!storedRole) {
      navigate("/login");
    } else {
      setRole(storedRole);
    }
  }, []);

  if (role === "admin") return <AdminDashboard />;
  if (role === "student") return <StudentDashboard />;

  return null;
}

export default Dashboard;