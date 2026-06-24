import express from "express";
import {
  createAssignment,
  getAllAssignments,
  getAssignmentsByFaculty,
  getAssignmentsByClass,
} from "../controllers/assignmentController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createAssignment);

router.get("/", protect, getAllAssignments);

router.get("/faculty", protect, getAssignmentsByFaculty);

router.get("/class/:classId", protect, getAssignmentsByClass);

export default router;
