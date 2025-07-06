import sampleData from "../../db";
import { Roles } from "../interfaces/interface";
import { v4 as uuidv4 } from "uuid";


export const roleResolvers = {
    Query: {
        getRole: async({ id }: { id: string }, context: any): Promise<Roles | undefined> => {
            // if (!context.user) {
            //     throw new Error("Unauthorized: Please log in.");
            // }

            if (!id) {
                throw new Error("Role ID is required.");
            }
            // Find and return the role by ID
            const [rows] = await context.db.query("SELECT * FROM roles WHERE id = ?", [id]);
            if (rows.length === 0) {
                throw new Error(`Role with ID ${id} does not exist.`);
            }
            // Return the role object
            return rows[0];
        },

        getRoles: async(context: any): Promise<Roles[]> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            const [rows] = await context.db.query("SELECT * FROM roles");
            if (rows.length === 0) {
                throw new Error("No roles found.");
            }
            return rows;
        },
    },
    Mutation: {
        createRole: async({ name, description }: Omit<Roles, "id">, context: any): Promise<Roles> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!name || !description) {
                throw new Error("Name and description are required to create a role.");
            }
            // Check if the role already exists
            const [existingRoles] = await context.db.query("SELECT * FROM roles WHERE name = ?", [name]);
            if (existingRoles.length > 0) {
                throw new Error(`Role with name "${name}" already exists.`);
            }
            // Create a new role object

            const newRole: Roles = {
                id: uuidv4(),
                name,
                description,
                createdAt: new Date().toISOString(),
                createdBy: "system" // This can be modified to include the actual creator's ID
            };
            // Insert the new role into the database
            await context.db.query("INSERT INTO roles (id, name, description, createdAt, createdBy) VALUES (?, ?, ?, ?, ?)", [
                newRole.id,
                newRole.name,
                newRole.description,
                newRole.createdAt,
                newRole.createdBy
            ]);
            return newRole;
        },

        updateRole: async({
            id,
            name,
            description
        }: Partial<Roles> & { id: string }, context: any): Promise<Roles | null> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("Role ID is required for updating.");
            }
            if (!name && !description) {
                throw new Error("At least one of name or description must be provided for updating a role.");
            }
            const [rows] = await context.db.query("SELECT * FROM roles WHERE id = ?", [id]);
            if (rows.length === 0) {
                throw new Error(`Role with ID ${id} does not exist.`);
            }
            const role = rows[0];
            if (name) role.name = name;
            if (description) role.description = description;
            // Update the role in the database
            await context.db.query("UPDATE roles SET name = ?, description = ? WHERE id = ?",
                [role.name, role.description, id]
            );
            // Return the updated role object
            return {
                id: role.id,
                name: role.name,        
                description: role.description,
                createdAt: role.createdAt,
                createdBy: role.createdBy
            };
           
        },

        deleteRole: async({ id }: { id: string }, context: any): Promise<Roles | null> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("Role ID is required for deletion.");
            }
            const [rows] = await context.db.query("SELECT * FROM roles WHERE id = ?", [id]);
            if (rows.length === 0) {
                throw new Error(`Role with ID ${id} does not exist.`);
            }
            await context.db.query("DELETE FROM roles WHERE id = ?", [id]);
            return rows[0];
        }
    }
};
