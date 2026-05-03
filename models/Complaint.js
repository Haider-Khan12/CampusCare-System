import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved", "Rejected"],
    default: "Pending",
  },

  studentId: {
  type: String,
  required: true,
},

  remarks: {
    type: String,
    default: "",
  },

}, { timestamps: true });

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;