
export const userType = `
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
    createUser(name: String!, email: String!, password: String!, role: String!, createdBy: String, createdAt: String!): User
    updateUser(id: ID!, name: String, email: String, role: String): User
    updateUserPassword(id: ID!, password: String!): User
    deleteUser(id: ID!): User
  }
`;