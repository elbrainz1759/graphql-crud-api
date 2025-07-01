import { Request } from "express";
import { isLoggedIn } from "./isLoggedIn";

export function isAdmin(req: Request) {
  const user = isLoggedIn(req);

    if (!user) {
        return "Unauthorized: User not logged in";
    }
    // Check if the user has admin or superAdmin role
    if (user.role !== "admin" && user.role !== "superAdmin") {
      console.log("Forbidden: Admins only");
      return null;
    }
    return user;
}
