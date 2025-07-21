export const teacherType = `
  type Teacher {
    id: ID!
    name: String!
    email: String!
    schoolId: String!
    createdAt: String!
    createdBy: String!
  }
    type Query {
        getTeacher(id: ID!): Teacher
        getTeachers: [Teacher!]!
        getTeachersBySchool(schoolId: String!): [Teacher!]!
        getTeachersByCreatedBy(createdBy: String!): [Teacher!]!
    }
    type Mutation {
        createTeacher(
            name: String!
            email: String!
            schoolId: String!
            createdBy: String!
            createdAt: String!
        ): Teacher
    
        updateTeacher(
            id: ID!
            name: String
            email: String
            schoolId: String
        ): Teacher
    
        deleteTeacher(id: ID!): Teacher
    }
`;
