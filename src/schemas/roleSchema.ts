import { buildSchema } from "graphql";

export const roleSchema = buildSchema(`
  type Roles {
    id: ID!
    name: String!
    description: String!
    permissions: [String!]!
  }

  type Query {
    getRole(id: ID!): Roles
    getRoles: [Roles!]!
  }

  type Mutation {
    createRole(name: String!, description: String!, permissions: [String!]!): Roles
    updateRole(id: ID!, name: String, description: String, permissions: [String!]): Roles
    deleteRole(id: ID!): Roles
  }
`);
