import { buildSchema } from "graphql";

export const stateSchema = buildSchema(`
  type State {
    id: ID!
    name: String!
    countryId: String!
    createdAt: String!
    createdBy: String!
  }

  type Query {
    getState(id: ID!): State
    getStates: [State!]!
  }

  type Mutation {
    createState(name: String!, countryId: String!, createdBy: String!, createdAt: String!): State
    updateState(id: ID!, name: String, countryId: String): State
    deleteState(id: ID!): State
  }
`);
