import express from "express";
import cors from "cors";
import tenantRoutes from "./routes/tenant.routes";
import adminRoutes from "./routes/admin.routes"

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tenants", tenantRoutes);  
app.use("/admin", adminRoutes); 


export default app;
