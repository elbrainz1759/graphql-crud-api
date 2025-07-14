export const studentsType = `
  type Student {
    id: ID!
    name: String!
    email: String!
    schoolId: String!
    createdAt: String!
    createdBy: String!
  }

  type Query {
    getStudent(id: ID!): Student
    getStudents: [Student!]!
    getStudentsBySchool(schoolId: String!): [Student!]!
    getStudentsByCreatedBy(createdBy: String!): [Student!]!
  }

    type Mutation {
        createStudent(
        name: String!
        email: String!
        schoolId: String!
        createdBy: String!
        createdAt: String!
        ): Student
    
        updateStudent(
        id: ID!
        name: String
        email: String
        schoolId: String
        ): Student
    
        deleteStudent(id: ID!): Student
    }
    `;
