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
app.use(cors());

// Routes
app.use("/tenants", tenantRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
