import { buildSchema } from "graphql";

export const schoolSchema = buildSchema(`
  type School {
    id: ID!
    name: String!
    address: String!
    country: String!
    phone: String!
    website: String!
    state: String!
    createdAt: String!
    createdBy: String!
  }

  type Query {
    getSchool(id: ID!): School
    getSchools: [School!]!
  }

  type Mutation {
    createSchool(
      name: String!
      address: String!
      country: String!
      phone: String!
      website: String!
      state: String!
      createdBy: String!
      createdAt: String!
    ): School

    updateSchool(
      id: ID!
      name: String
      address: String
      country: String
      phone: String
      website: String
      state: String
    ): School

    deleteSchool(id: ID!): School
  }
`);
