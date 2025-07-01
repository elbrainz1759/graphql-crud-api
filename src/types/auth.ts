export const authType = `
  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthPayload!
  }
`;   