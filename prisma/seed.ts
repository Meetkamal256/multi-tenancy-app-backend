import { PrismaClient } from "@prisma/client";
import { tenantsData } from "./tenantsData"

const prisma = new PrismaClient();

const seedDatabase = async () => {
  try {
    await prisma.tenant.deleteMany(); 
    
    await prisma.tenant.createMany({ data: tenantsData });
    
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase();
