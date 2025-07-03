import bcrypt from "bcrypt";
import { User } from "../interfaces/interface"
import { v4 as uuidv4 } from "uuid";
import sampleData from "../../db";

let users: User[] = sampleData.users || [];

export const userResolvers = {
    Query: {
        getUser: async ({ id }: { id: string }) => {
            return users.find(user => user.id === id);
        },
        getUsers: async () => {
            return users;
        },
    },
    Mutation: {
        createUser: async ({ name, email, role, password }: { name: string; email: string; role: string; password: string }, context: any) => {
            if (!context.user) {
                console.log("Unauthorized: Please log in.");
                return null;
            }
            // Validate input fields
            if (!name || !email || !password || !role) {
                console.log("All fields (name, email, password, role) are required");
                return null;
            }
            if (!["user", "admin", "superAdmin"].includes(role)) {
                console.log("Invalid role specified");
                return null;
            }
            // Check if user already exists
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
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
                createdBy: "system" // This can be modified to include the actual creator's ID
            };
            users.push(newUser);
            return newUser;
        },
        updateUser: ({ id, name, email, role }: { id: string; name?: string; email?: string; role?: string }, context: any) => {
            if (!context.user) {
                console.log("Unauthorized: Please log in.");
                return null;
            }
            if (!id) {
                console.log("User ID is required for update.");
                return null;
            }
            let user = users.find(user => user.id === id);

            if (!user) return null;

            if (!name && !email && !role) {
                console.log("At least one field (name, email, role) must be provided for update");
                return user // Return the user without changes if no fields are provided
            }
            if (role && !["user", "admin", "superAdmin"].includes(role)) {
                console.log("Invalid role specified");
                return user;
            }

            if (name) user.name = name;
            if (email) user.email = email;
            if (role) user.role = role as "user" | "admin" | "superAdmin";
            return user;
        },
        deleteUser: ({ id }: { id: string }, context: any) => {
            if (!context.user) {
                console.log("Unauthorized: Please log in.");
                return null;
            }
            if (!id) {
                console.log("User ID is required for deletion.");
                return null;
            }
            if (!users.some(user => user.id === id)) {
                console.log(`User with ID ${id} does not exist.`);
                return null;
            }
            // Find the user by ID and remove them from the array
            const userIndex = users.findIndex(user => user.id === id);
            if (userIndex === -1) return null;
            const deletedUser = users[userIndex];
            users.splice(userIndex, 1);
            return deletedUser;
        }
    }
};