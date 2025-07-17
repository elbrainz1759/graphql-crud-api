export const classType = `
  type Class {
    id: ID!
    name: String!
    schoolId: String!
    createdAt: String!
    createdBy: String!
  }

  type Query {
    getClass(id: ID!): Class
    getClasses: [Class!]!
    getClassesBySchool(schoolId: String!): [Class!]!
    getClassesByCreatedBy(createdBy: String!): [Class!]!
  }
    type Mutation {
        createClass(
        name: String!
        schoolId: String!
        createdBy: String!
        createdAt: String!
        ): Class
    
        updateClass(
        id: ID!
        name: String
        schoolId: String
        ): Class
        deleteClass(id: ID!): Class
    }
`;