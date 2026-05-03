import express from "express";
import {
  createComplaint,
  getStudentComplaints,
  getAllComplaints,
  updateComplaint,
  deleteComplaint
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/create", createComplaint);
router.get("/student/:studentId", getStudentComplaints);
router.get("/", getAllComplaints);
router.put("/:id", updateComplaint);
router.delete("/:id", deleteComplaint);

export default router;