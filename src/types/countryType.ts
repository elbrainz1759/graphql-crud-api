
export const countryType = `
  type Country {
    id: ID!
    name: String!
    code: String!
    createdAt: String!
    createdBy: String!
  }

  type Query {
    getCountry(id: ID!): Country
    getCountries: [Country!]!
  }

  type Mutation {
    createCountry(
      name: String!,
      code: String!,
      createdBy: String,
      createdAt: String
    ): Country
    updateCountry(
      id: ID!,
      name: String,
      code: String
    ): Country
    deleteCountry(id: ID!): Country
  }

  input CountryInput {
    id: ID!
  }
`;


