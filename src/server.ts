import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import tenantRoutes from "./routes/tenant.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
  res.send("🚀 Server is running smoothly!");
});

// Routes
app.use("/tenants", tenantRoutes);
app.use("/auth", authRoutes);

// Global Error Handler
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Global Error:", err.message);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
