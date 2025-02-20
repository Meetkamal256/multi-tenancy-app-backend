import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

interface AuthRequest extends Request {
  user?: { userId: string; email: string };
}

// Register User
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Received request body:", req.body);
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      console.error("Missing fields in request");
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    
    console.log("Checking for existing user...");
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.error("User already exists");
      res.status(400).json({ error: "Email already registered" });
      return;
    }
     console.log("Hashing password..");
    const hashedPassword = await bcrypt.hash(password, 10);
     console.log("Password hashed successfully:", hashedPassword);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    
     console.log("User registered successfully:", newUser);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔵 Login User
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔴 Get User Profile (Protected Route)
router.get(
  "/profile",
  authenticateUser,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      
      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: { id: true, name: true, email: true },
      });
      
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;
