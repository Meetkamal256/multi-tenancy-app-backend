import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

interface AuthRequest extends Request {
  user?: { userId: string; email: string; role: string };
}

// Authenticate User Middleware
export const authenticateUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized - No token provided" });
    return;
  }
  
  const token = authHeader.split(" ")[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthRequest["user"];
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

// Role-Based Access Middleware
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res
        .status(403)
        .json({ message: "Forbidden - You don’t have permission" });
      return;
    }
    next();
  };
};
