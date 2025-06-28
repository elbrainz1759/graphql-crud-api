import { Roles } from "../types/types";
import { v4 as uuidv4 } from "uuid";

let roles: Roles[] = [];

export const roleResolvers = {
  getRole: ({ id }: { id: string }): Roles | undefined =>
    roles.find(r => r.id === id),

  getRoles: (): Roles[] => roles,

  createRole: ({ name, description, permissions }: Omit<Roles, "id">): Roles => {
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
  }: Partial<Roles> & { id: string }): Roles | null => {
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
};
