import { Request, Response } from "express";
import jwt from "jsonwebtoken";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "superAdmin";
}

export function isLoggedIn(req: Request) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.error("Unauthorized: No token provided");
    return null;
  }

  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || "secret") as User;
    return user;
  } catch {
    console.error("Unauthorized: Invalid token");
    return null;
  }
}


