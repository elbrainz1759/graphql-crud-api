import sampleData from "../../db";
import { Permission } from "../interfaces/interface";
import { v4 as uuidv4 } from "uuid";

let permissions: Permission[] = sampleData.permissions || [];

export const permissionResolvers = {
    // Resolve into Query and Mutation types
    Query: {
        getPermission: (_: any, { id }: { id: string }): Permission | undefined =>
            permissions.find(p => p.id === id),
        getPermissions: (): Permission[] => permissions,
    },
    Mutation: {
        createPermission: (_: any, { name, description }: Omit<Permission, "id">): Permission => {
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
        updatePermission: (_: any, { id, name, description }: Partial<Permission> & { id: string }): Permission | null => {
            const permission = permissions.find(p => p.id === id);
            if (!permission) return null;
            if (name) permission.name = name;
            if (description) permission.description = description;
            return permission;
        },
        deletePermission: (_: any, { id }: { id: string }): Permission | null => {
            const index = permissions.findIndex(p => p.id === id);
            if (index === -1) return null;
            return permissions.splice(index, 1)[0];
        }
    },
};
