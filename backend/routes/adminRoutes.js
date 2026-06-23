import express from "express";
import { createUser, getAllUsers } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-user", protect, adminOnly, createUser);
router.get("/users", protect, adminOnly, getAllUsers);

export default router;
