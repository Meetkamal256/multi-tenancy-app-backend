import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Protected route to get user profile
router.get("/profile", authenticateUser, getUserProfile);

export default router;
