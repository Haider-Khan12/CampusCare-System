import Chat from "../models/Chat.js";

export const sendMessage = async (req, res) => {
  try {
    const { complaintId, sender, message } = req.body;

    const newMessage = new Chat({
      complaintId,
      sender,
      message,
    });

    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const messages = await Chat.find({ complaintId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};