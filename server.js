import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import Chat from "./models/Chat.js";
import Notification from "./models/Notification.js";
import Complaint from "./models/Complaint.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

io.on("connection", (socket) => {
  socket.on("joinRoom", async (complaintId) => {
    socket.join(complaintId);

    const messages = await Chat.find({ complaintId }).sort({ createdAt: 1 });
    socket.emit("loadMessages", messages);
  });

  socket.on("sendMessage", async (data) => {
    const newMessage = new Chat(data);
    await newMessage.save();

    io.to(data.complaintId).emit("receiveMessage", newMessage);

    const complaint = await Complaint.findById(data.complaintId);

    if (complaint) {
      const receiverId =
        data.sender === "student" ? complaint.adminId : complaint.studentId;

      if (receiverId) {
        await Notification.create({
          userId: receiverId,
          message: "New message in chat",
        });
      }
    }
  });
});

server.listen(5001, () => {
  console.log("Server running on port 5001");
});