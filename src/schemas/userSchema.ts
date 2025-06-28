import { buildSchema } from "graphql";

export const userSchema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    createdBy: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User!]!
    }
  type Mutation {
    createUser(name: String!, email: String!, createdBy: String, createdAt: String!): User
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): User
  }
`);