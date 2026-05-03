import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

function Chat() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const role = localStorage.getItem("role");

  const bottomRef = useRef(null);

  useEffect(() => {
    socket.emit("joinRoom", id);

    socket.on("loadMessages", (data) => {
      setMessages(data);
    });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("loadMessages");
      socket.off("receiveMessage");
    };
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      complaintId: id,
      sender: role,
      message: text,
    });

    setText("");
  };

  return (
    <div className="container">
      <h2>Chat</h2>

      <div
        style={{
          height: "350px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          background: "#fafafa",
        }}
      >
        {messages.map((m) => (
          <div
            key={m._id}
            style={{
              alignSelf: m.sender === role ? "flex-end" : "flex-start",
              backgroundColor:
                m.sender === role ? "#dcf8c6" : "#f1f0f0",
              padding: "8px 12px",
              borderRadius: "10px",
              marginBottom: "8px",
              maxWidth: "70%",
              textAlign: "left",
            }}
          >
            <strong style={{ fontSize: "12px" }}>{m.sender}</strong>
            <div>{m.message}</div>
            <small style={{ fontSize: "10px", color: "gray" }}>
              {new Date(m.createdAt).toLocaleTimeString()}
            </small>
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message"
        style={{ marginTop: "10px" }}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;