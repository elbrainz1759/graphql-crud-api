import bcrypt from "bcrypt";
import { User } from "../interfaces/interface"
import { v4 as uuidv4 } from "uuid";


export const userResolvers = {
    Query: {
        getUser: async ({ id }: { id: string }, context: any) => {
            const [rows] = await context.db.query("SELECT * FROM users WHERE id = ?", [id]);
            return rows[0];
        },
        getUsers: async (context: any) => {
            const [rows] = await context.db.query("SELECT * FROM users");
            return rows;
        },
    },
    Mutation: {
        createUser: async ({ name, email, role, password, countryId }: { name: string; email: string; role: string; password: string; countryId: string }, context: any) => {
            // if (!context.user) {
            //     console.log("Unauthorized: Please log in.");
            //     return null;
            // }
            // Validate input fields
            if (!name || !email || !password || !role || !countryId) {
                console.log("All fields (name, email, password, role, countryId) are required");
                return null;
            }
            if (!["user", "admin", "superAdmin"].includes(role)) {
                console.log("Invalid role specified");
                return null;
            }
            // Check if user already exists
            const existingUser = await context.db.query("SELECT * FROM users WHERE email = ?", [email]);
            if (existingUser.length > 0) {
                console.log("User with this email already exists");
                return null;
            }

            // Password hashing using bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser: User = {
                id: uuidv4(),
                name,
                email,
                password: hashedPassword,
                role: role as "user" | "admin" | "superAdmin",
                createdAt: new Date().toISOString(),
                countryId,
                createdBy: "system" // This can be modified to include the actual creator's ID
            };
            // Insert the new user into the database
            await context.db.query("INSERT INTO users (id, name, email, password, role, createdAt, createdBy, countryId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
                newUser.id,
                newUser.name,
                newUser.email,
                newUser.password,
                newUser.role,
                newUser.createdAt,
                newUser.createdBy,
                newUser.countryId
            ]);
            return newUser;
        },
        updateUser: async ({ id, name, email, role, countryId }: { id: string; name?: string; email?: string; role?: string; countryId?: string }, context: any) => {
            if (!context.user) {
                console.log("Unauthorized: Please log in.");
                return null;
            }
            if (!id) {
                console.log("User ID is required for update.");
                return null;
            }
            // Find the user by ID
            const [user] = await context.db.query("SELECT * FROM users WHERE id = ?", [id]);
            if (!user) {
                console.log(`User with ID ${id} does not exist.`);
                return null;
            }

            if (!name && !email && !role && !countryId) {
                console.log("At least one field (name, email, role, countryId) must be provided for update");
                return user // Return the user without changes if no fields are provided
            }
            if (role && !["user", "admin", "superAdmin"].includes(role)) {
                console.log("Invalid role specified");
                return user;
            }
            // Update the user fields
            const updateUser = await context.db.query("UPDATE users SET name = ?, email = ?, role = ?, countryId = ? WHERE id = ?", [
                name || user.name,
                email || user.email,
                role || user.role,
                countryId || user.countryId,
                id
            ]);
            if (updateUser.affectedRows === 0) {
                console.log(`Failed to update user with ID ${id}.`);
                return null;
            }
            // Return the updated user object
            return {
                id: user.id,
                name: name || user.name,
                email: email || user.email,
                role: role || user.role,
                countryId: countryId || user.countryId,
                createdAt: user.createdAt,
                createdBy: user.createdBy
            };
        },
        deleteUser: async ({ id }: { id: string }, context: any) => {
            if (!context.user) {
                console.log("Unauthorized: Please log in.");
                return null;
            }
            if (!id) {
                console.log("User ID is required for deletion.");
                return null;
            }
            const [deletedUser] = await context.db.query("DELETE FROM users WHERE id = ? RETURNING *", [id]);
            return deletedUser;
        }
    }
};