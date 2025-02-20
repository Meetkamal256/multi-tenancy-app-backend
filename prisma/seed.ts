import { PrismaClient } from "@prisma/client";
import { tenantsData } from "./tenantsData"

const prisma = new PrismaClient();

const seedDatabase = async () => {
  try {
    console.log("🗑 Deleting old tenants...");
    await prisma.tenant.deleteMany(); 
    
    console.log("📥 Inserting fresh tenants...");
    await prisma.tenant.createMany({ data: tenantsData });
    
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase();
