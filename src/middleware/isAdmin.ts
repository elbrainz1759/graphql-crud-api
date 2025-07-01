import { getLoggedInUser, User } from "./isLoggedIn";
import { IncomingMessage } from "http";

export function requireAdmin(req: IncomingMessage): User | null {
  const user = getLoggedInUser(req);

  if (!user) {
    console.log("Unauthorized: No user in context");
    return null;
  }

  if (user.role !== "admin" && user.role !== "superAdmin") {
    console.log("Forbidden: Admins only");
    return null;
  }

  return user;
}
