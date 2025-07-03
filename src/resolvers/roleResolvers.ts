import sampleData from "../../db";
import { Roles } from "../interfaces/interface";
import { v4 as uuidv4 } from "uuid";

let roles: Roles[] = sampleData.roles || [];

export const roleResolvers = {
    Query: {
        getRole: ({ id }: { id: string }, context: any): Roles | undefined => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            return roles.find(r => r.id === id);
        },

        getRoles: (context: any): Roles[] => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            return roles;
        },
    },
    Mutation: {
        createRole: ({ name, description, permissions }: Omit<Roles, "id">, context: any): Roles => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!name || !description || !permissions) {
                throw new Error("Name, description, and permissions are required to create a role.");
            }
            if (roles.some(r => r.name === name)) {
                throw new Error(`Role with name "${name}" already exists.`);
            }
            const newRole: Roles = {
                id: uuidv4(),
                name,
                description,
                permissions,
                createdAt: new Date().toISOString(),
                createdBy: "system" // This can be modified to include the actual creator's ID
            };
            roles.push(newRole);
            return newRole;
        },

        updateRole: ({
            id,
            name,
            description,
            permissions
        }: Partial<Roles> & { id: string }, context: any): Roles | null => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("Role ID is required for updating.");
            }
            if (!name && !description && !permissions) {
                throw new Error("At least one of name, description, or permissions must be provided for updating a role.");
            }
            const role = roles.find(r => r.id === id);
            if (!role) return null;
            if (name) role.name = name;
            if (description) role.description = description;
            if (permissions) role.permissions = permissions;
            return role;
        },

        deleteRole: ({ id }: { id: string }): Roles | null => {
            const index = roles.findIndex(r => r.id === id);
            if (index === -1) return null;
            return roles.splice(index, 1)[0];
        }
    }
};
