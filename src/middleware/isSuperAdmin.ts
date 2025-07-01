import { Request } from "express";
import { getLoggedInUser } from "./isLoggedIn";

export function isSuperAdmin(req: Request) {
  const user = getLoggedInUser(req);
  if (user && user.role === "superAdmin") {
    return user;
  }
  console.log("Forbidden: SuperAdmins only");
  return null;
}
