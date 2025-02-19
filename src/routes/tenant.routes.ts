import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Create a new tenant
const createTenant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;
    
    // Validate request body
    if (!name || !email) {
      res.status(400).json({ error: "Name and email are required" });
      return;
    }
    
    // Create new tenant in database
    const tenant = await prisma.tenant.create({
      data: { name, email },
    });
    
    res.status(201).json(tenant);
  } catch (error) {
    console.error("Error creating tenant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a tenant by ID
const getTenantById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const tenant = await prisma.tenant.findUnique({ where: { id } });
    
    if (!tenant) {
      res.status(404).json({ error: "Tenant not found" });
      return;
    }
    
    res.json(tenant);
  } catch (error) {
    console.error("Error fetching tenant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Register the routes
router.post("/", createTenant);
router.get("/:id", getTenantById);

export default router;
