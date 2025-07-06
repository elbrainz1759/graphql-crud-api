import { Permission } from "../interfaces/interface";
import { v4 as uuidv4 } from "uuid";


export const permissionResolvers = {
    // Resolve into Query and Mutation types
    Query: {
        getPermission: async(_: any, { id }: { id: string }, context: any): Promise<Permission[]> => {
            // if (!context.user) {
            //     throw new Error("Unauthorized: Please log in.");
            // }
            if (!id) {
                throw new Error("Permission ID is required.");
            }
            // Find and return the permission by ID
            const permission = await context.db.query("SELECT * FROM permissions WHERE id = ?", [id]);
            if (permission.length === 0) {
                throw new Error(`Permission with ID ${id} does not exist.`);
            }
            // Return the permission object
            return permission[0];
        },
        getPermissions: async(context: any): Promise<Permission[]> => {
            // if (!context.user) {
            //     throw new Error("Unauthorized: Please log in.");
            // }
            const [rows] = await context.db.query("SELECT * FROM permissions");
            if (rows.length === 0) {
                throw new Error("No permissions found.");
            }
            // Return all permissions
            return rows
        },
    },
    Mutation: {
        createPermission: async(_: any, { name, description }: Omit<Permission, "id">, context: any): Promise<Permission> => {
            // if (!context.user) {
            //     throw new Error("Unauthorized: Please log in.");
            // }
            if (!name || !description) {
                throw new Error("Name and description are required to create a permission.");
            }
            // Check if the permission already exists
            const [existingPermissions] = await context.db.query("SELECT * FROM permissions WHERE name = ?", [name]);
            if (existingPermissions.length > 0) {
                throw new Error(`Permission with name "${name}" already exists.`);
            }

            // Create a new permission object
            const newPermission = await context.db.query("INSERT INTO permissions (id, name, description, createdAt, createdBy) VALUES (?, ?, ?, ?, ?)", [
                uuidv4(),
                name,
                description,
                new Date().toISOString(),
                "system" // This can be modified to include the actual creator's ID
            ]);
            return newPermission;
        },
        updatePermission: async(_: any, { id, name, description }: Partial<Permission> & { id: string }, context: any): Promise<Permission | null> => {
            // if (!context.user) {
            //     throw new Error("Unauthorized: Please log in.");
            // }
            if (!id) {
                throw new Error("Permission ID is required for updating.");
            }
            if (!name && !description) {
                throw new Error("At least one of name or description must be provided for updating a permission.");
            }
            // Find the permission to update
            const [permissions] = await context.db.query("SELECT * FROM permissions WHERE id = ?", [id]);
            if (permissions.length === 0) {
                throw new Error(`Permission with ID ${id} does not exist.`);
            }
            // Update the permission fields
            const updatedPermission = permissions[0];
            // Update the fields if provided
            if (!updatedPermission) {
                throw new Error(`Permission with ID ${id} does not exist.`);
            }
            const permission = await context.db.query("UPDATE permissions SET name = ?, description = ? WHERE id = ?", [
                name || updatedPermission.name,
                description || updatedPermission.description,
                id
            ]);
            // If the permission was not found, return null
            if (permission.length === 0) {
                return null;
            }   
            // Return the updated permission object
            return {
                id: permission[0].id,
                name: permission[0].name,
                description: permission[0].description,
                createdAt: permission[0].createdAt,
                createdBy: permission[0].createdBy
            };
        },
        deletePermission: async(_: any, { id }: Partial<Permission> & { id: string }, context: any): Promise<Permission | null> => {
            // if (!context.user) {
            //     throw new Error("Unauthorized: Please log in.");
            // }
            if (!id) {
                throw new Error("Permission ID is required for deletion.");
            }
            // Check if the permission exists
            const [permissions] = await context.db.query("SELECT * FROM permissions WHERE id = ?", [id]);
            // If the permission does not exist, throw an error
            if (permissions.length === 0) {
                throw new Error(`Permission with ID ${id} does not exist.`);
            }
            // Delete the permission from the database
            await context.db.query("DELETE FROM permissions WHERE id = ?", [id]);
            // Return the deleted permission object
            return {
                id: permissions[0].id,
                name: permissions[0].name,
                description: permissions[0].description,
                createdAt: permissions[0].createdAt,
                createdBy: permissions[0].createdBy
            };
        }
    },
};
