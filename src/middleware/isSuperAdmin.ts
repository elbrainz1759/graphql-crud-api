import { Request } from "express";
import { isLoggedIn } from "./isLoggedIn";

export function isSuperAdmin(req: Request) {
    const user = isLoggedIn(req);

    if (!user) {
        console.log("Unauthorized: User not logged in");
        return null;
    }
    // Check if the user has superAdmin role
    if (user.role !== "superAdmin") {
        console.log("Forbidden: SuperAdmins only");
        return null;
    }
    return user;
}
