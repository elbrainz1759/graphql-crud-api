export const schoolAdminType = `
  type SchoolAdmin {
    id: ID!
    name: String!
    email: String!
    schoolId: String!
    createdAt: String!
    createdBy: String!
  }
    type Query {
        getSchoolAdmin(id: ID!): SchoolAdmin
        getSchoolAdmins: [SchoolAdmin!]!
    }
    type Mutation {
            createSchoolAdmin(
                name: String!,
                email: String!,
                schoolId: String!,
                createdBy: String,
                createdAt: String
            ): SchoolAdmin
            updateSchoolAdmin(
                id: ID!,
                name: String,
                email: String,
                schoolId: String
            ): SchoolAdmin
            deleteSchoolAdmin(id: ID!): SchoolAdmin
        }
    input SchoolAdminInput {
        name: String!
        email: String!
        schoolId: String!
        createdBy: String
        createdAt: String
    }   
`;
