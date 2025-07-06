
export const userType = `
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    createdBy: String!
    countryId: String
    role: String!
    password: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User!]!
    }
  type Mutation {
    createUser(name: String!, email: String!, countryId: String, password: String!, role: String!, createdBy: String, createdAt: String!): User
    updateUser(id: ID!, name: String, countryId: String, email: String, role: String): User
    updateUserPassword(id: ID!, password: String!): User
    deleteUser(id: ID!): User
  }
`;