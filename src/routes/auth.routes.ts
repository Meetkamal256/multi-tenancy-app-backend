import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/auth.controller";
import { authenticateUser, authorizeRoles } from "../middleware/authMiddleware";

const router = Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Protected route to get user profile
router.get("/profile", authenticateUser, getUserProfile);

// Admin-only route (Example)
router.get(
  "/admin",
  authenticateUser,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Welcome to the admin dashboard" });
  }
);

export default router;
