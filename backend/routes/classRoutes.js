import express from "express";
import { createClass, getAllClasses } from "../controllers/classController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, adminOnly, createClass);
router.get("/", protect, adminOnly, getAllClasses);

export default router;
