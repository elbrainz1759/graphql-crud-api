import { stateType } from "./stateType";
import { countryType } from "./countryType";

export const schoolType = `
  type School {
    id: ID!
    name: String!
    address: String!
    phone: String!
    website: String!
    createdAt: String!
    createdBy: String!
    state: State!
    country: Country!
  }

  type Query {
    getSchool(id: ID!): School
    getSchools: [School!]!
    getSchoolsByState(state: String!): [School!]!
    getSchoolsByCountry(country: String!): [School!]!
    getSchoolsByCreatedBy(createdBy: String!): [School!]!
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
`;

