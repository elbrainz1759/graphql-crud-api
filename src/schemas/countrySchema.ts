import { buildSchema } from "graphql";

export const countrySchema = buildSchema(`
  type Country {
    id: ID!
    name: String!
    code: String!
  }

  type Query {
    getCountry(id: ID!): Country
    getCountries: [Country!]!
  }

  type Mutation {
    createCountry(name: String!, code: String!): Country
    updateCountry(id: ID!, name: String, code: String): Country
    deleteCountry(id: ID!): Country
  }
`);
