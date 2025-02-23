import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get Admin Dashboard Stats with Recent Activities
export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const totalTenants = await prisma.tenant.count();
    const activeSubscriptions = await prisma.tenant.count({
      where: { isActive: true },
    });
    
    
    
    // Fetch the 5 most recent tenant activities
    const recentActivity = await prisma.tenant.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    
    res.json({
      tenants: totalTenants,
      activeSubscriptions,
      recentActivity, 
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
