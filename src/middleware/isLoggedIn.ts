import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "superAdmin";
}

export function getLoggedInUser(req: IncomingMessage): User | null {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("Unauthorized: No token provided");
    return null;
  }

  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || "secret") as User;
    return user;
  } catch {
    console.log("Unauthorized: Invalid token");
    return null;
  }
}
