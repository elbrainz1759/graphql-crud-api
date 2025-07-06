
export const roleType = `
  type Roles {
    id: ID!
    name: String!
    description: String!
    createdAt: String!
    createdBy: String!
  }

  type Query {
    getRole(id: ID!): Roles
    getRoles: [Roles!]!
  }

  type Mutation {
    createRole(name: String!, description: String!, createdBy: String!, createdAt: String!): Roles
    updateRole(id: ID!, name: String, description: String): Roles
    deleteRole(id: ID!): Roles
  }
`;
