"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const tenantsData_1 = require("./tenantsData");
const prisma = new client_1.PrismaClient();
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🗑 Deleting old tenants...");
        yield prisma.tenant.deleteMany(); // Clears old data
        console.log("📥 Inserting fresh tenants...");
        yield prisma.tenant.createMany({ data: tenantsData_1.tenantsData });
        console.log("✅ Database seeded successfully!");
    }
    catch (error) {
        console.error("❌ Seeding failed:", error);
    }
    finally {
        yield prisma.$disconnect();
    }
});
seedDatabase();
