import express from "express";
import {
  submitAssignment,
  getSubmissionsByAssignment,
  evaluateSubmission, createSubmission, getAllSubmissions
} from "../controllers/submissionController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/submit", protect, submitAssignment);
router.get("/:assignmentId", protect, getSubmissionsByAssignment);
router.post("/evaluate", protect, evaluateSubmission);
router.post("/", protect, createSubmission);
router.get("/", protect, (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "faculty") {
    next();
  } else {
    return res.status(403).json({ message: "Not allowed" });
  }
}, getAllSubmissions);

export default router;
