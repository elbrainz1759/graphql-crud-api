import sampleData from "../../db";
import { Permission } from "../interfaces/interface";
import { v4 as uuidv4 } from "uuid";

let permissions: Permission[] = sampleData.permissions || [];

export const permissionResolvers = {
    // Resolve into Query and Mutation types
    Query: {
        getPermission: (_: any, { id }: { id: string }, context: any): Permission | undefined => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            return permissions.find(p => p.id === id);
        },
        getPermissions: (context: any): Permission[] => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            return permissions;
        },
    },
    Mutation: {
        createPermission: (_: any, { name, description }: Omit<Permission, "id">, context: any): Permission => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!name || !description) {
                throw new Error("Name and description are required to create a permission.");
            }
            if (permissions.some(p => p.name === name)) {
                throw new Error(`Permission with name "${name}" already exists.`);
            }
            // Create a new permission object
            const newPermission: Permission = {
                id: uuidv4(),
                name,
                description,
                createdAt: new Date().toISOString(),
                createdBy: "system" // This can be modified to include the actual creator's ID
            };
            permissions.push(newPermission);
            return newPermission;
        },
        updatePermission: (_: any, { id, name, description }: Partial<Permission> & { id: string }, context: any): Permission | null => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("Permission ID is required for updating.");
            }
            if (!name && !description) {
                throw new Error("At least one of name or description must be provided for updating a permission.");
            }
            // Find the permission to update
            const permission = permissions.find(p => p.id === id);
            if (!permission) return null;
            if (name) permission.name = name;
            if (description) permission.description = description;
            return permission;
        },
        deletePermission: (_: any, { id }: { id: string }, context: any): Permission | null => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("Permission ID is required for deletion.");
            }
            if (!permissions.some(p => p.id === id)) {
                throw new Error(`Permission with ID ${id} does not exist.`);
            }
            // Find the index of the permission to delete
            const index = permissions.findIndex(p => p.id === id);
            if (index === -1) return null;
            return permissions.splice(index, 1)[0];
        }
    },
};
