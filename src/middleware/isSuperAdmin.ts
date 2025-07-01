import { getLoggedInUser } from "./isLoggedIn";
import { IncomingMessage } from "http";

export function isSuperAdmin(req: IncomingMessage) {
  const user = getLoggedInUser(req);
  if (user && user.role === "superAdmin") {
    return user;
  }
  console.log("Forbidden: SuperAdmins only");
  return null;
}
