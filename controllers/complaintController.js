import Complaint from "../models/Complaint.js";
import Notification from "../models/Notification.js";


    export const createComplaint = async (req, res) => {
  try {
    const { title, description, category, priority, studentId } = req.body;

    console.log("SAVING studentId:", studentId); // 👈 MOVE HERE

    if (!title || !description || !category || !priority || !studentId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const complaint = new Complaint({
      title,
      description,
      category,
      priority,
      studentId,
    });

    await complaint.save();

    res.status(201).json({ message: "Complaint submitted" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const data = await Complaint.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


import mongoose from "mongoose";

export const getStudentComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      studentId: req.params.studentId,
    });

    console.log("MATCHED:", complaints);

    res.json(complaints);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateComplaint = async (req, res) => {
  try {
    const { status, remarks, title, description, category, priority } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

  
    if (title) complaint.title = title;
    if (description) complaint.description = description;
    if (category) complaint.category = category;
    if (priority) complaint.priority = priority;

    
    if (status) complaint.status = status;
    if (remarks) complaint.remarks = remarks;

    await complaint.save();

    
    if (status) {
      await Notification.create({
        userId: complaint.studentId,
        message: `Your complaint "${complaint.title}" is now ${complaint.status}`,
      });
    }

    res.json({ message: "Updated successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteComplaint = async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};