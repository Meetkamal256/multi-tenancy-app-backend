import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb"; // Import ObjectId for MongoDB

const router = Router();
const prisma = new PrismaClient();

// Create a new tenant
const createTenant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, isActive = true } = req.body;
    if (!name || !email) {
      res.status(400).json({ error: "Name and email are required" });
      return;
    }

    const tenant = await prisma.tenant.create({
      data: { name, email, isActive },
    });
    res.status(201).json(tenant);
  } catch (error) {
    console.error("Error creating tenant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all tenants
const getAllTenants = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tenants = await prisma.tenant.findMany();
    res.json(tenants);
  } catch (error) {
    console.error("Error fetching tenants:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single tenant by ID
const getTenantById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate and convert id
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid tenant ID" });
      return;
    }

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

// Update a tenant
const updateTenant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, isActive } = req.body;

    // Validate and convert id
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid tenant ID" });
      return;
    }

    const updatedTenant = await prisma.tenant.update({
      where: { id },
      data: { name, email, isActive },
    });

    res.json(updatedTenant);
  } catch (error) {
    console.error("Error updating tenant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a tenant
const deleteTenant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate and convert id
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid tenant ID" });
      return;
    }

    await prisma.tenant.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting tenant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Register the routes
router.post("/", createTenant);
router.get("/", getAllTenants);
router.get("/:id", getTenantById);
router.put("/:id", updateTenant);
router.delete("/:id", deleteTenant);

export default router;
