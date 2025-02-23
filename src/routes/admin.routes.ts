import { Router } from "express";
import {
  getAdminStats,
} from "../controllers/admin.controller";
import { authenticateUser, authorizeRoles } from "../middleware/authMiddleware";

const router = Router();

// Protect routes and allow only admin access
router.get("/stats", authenticateUser, authorizeRoles("admin"), getAdminStats);
router.get(
  "/recent-activity",
  authenticateUser,
  authorizeRoles("admin"),
);

export default router;
