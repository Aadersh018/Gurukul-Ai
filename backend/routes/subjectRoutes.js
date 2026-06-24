import express from "express";
import {
  createSubject,
  getAllSubjects,
} from "../controllers/subjectController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, adminOnly, createSubject);

router.get("/", protect, adminOnly, getAllSubjects);

export default router;
