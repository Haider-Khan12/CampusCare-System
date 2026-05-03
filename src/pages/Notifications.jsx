import { useEffect, useState } from "react";

function Notifications() {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:5001/api/notifications/${userId}`)
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="container">
      <h2>Notifications</h2>

      {data.map((n) => (
        <p key={n._id}>
          {n.message}
        </p>
      ))}
    </div>
  );
}

export default Notifications;