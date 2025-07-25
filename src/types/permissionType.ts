
export const permissionType = `
  type Permission {
    id: ID!
    name: String!
    description: String!
    createdAt: String!
    createdBy: String!

  }

  type Query {
    getPermission(id: ID!): Permission
    getPermissions: [Permission!]!
  }

  type Mutation {
    createPermission(name: String!, description: String!, createdBy: String!, createdAt: String!): Permission
    updatePermission(id: ID!, name: String, description: String): Permission
    deletePermission(id: ID!): Permission
  }
`;
