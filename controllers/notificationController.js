import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  const { userId } = req.params;
  const data = await Notification.find({ userId }).sort({ createdAt: -1 });
  res.json(data);
};

export const markAsRead = async (req, res) => {
  await Notification.updateMany(
    { userId: req.params.userId },
    { read: true }
  );
  res.json({ message: "Marked as read" });
};