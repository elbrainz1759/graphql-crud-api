import { studentResolvers } from "../src/resolvers/studentResolvers"; 

// test cases for studentResolvers using jest and context with mock database
describe("Student Resolvers", () => {
    // Mock data for students
    const mockStudents = [
        { id: "1", name: "John Doe", email: "       john@example.com", schoolId: "school-1", createdAt: new Date().toISOString(), createdBy: "user-1" },
        { id: "2", name: "Jane Smith", email: "       jane@example.com", schoolId: "school-1", createdAt: new Date().toISOString(), createdBy: "user-1" },
    ];
    const mockContext = {
        user: { id: "user-1" }, // Simulating a logged-in user
        db: {
            query: jest.fn((query, params) => {
                if (query.includes("SELECT * FROM students WHERE id = ?")) {
                    return [mockStudents.filter(student => student.id === params[0])];
                } else if (query.includes("SELECT * FROM students")) {
                    return [mockStudents];
                } else if (query.includes("INSERT INTO students SET ?")) {
                    const newStudent = { ...params[0], id: "new-id" };
                    mockStudents.push(newStudent);
                    return [newStudent];
                } else if (query.includes("UPDATE students SET")) {
                    const student = mockStudents.find(s => s.id === params[0].id);
                    if (student) {
                        Object.assign(student, params[0]);
                        return [student];
                    }
                }
                return [[]];
            }),
        },
    };
    // Test for creating a student
    it("creates a student", async () => {
        const newStudent = await studentResolvers.Mutation.createStudent(
            { name: "Alice Johnson", email: "alice@example.com", schoolId: "school-1" },
            mockContext
        );
        expect(newStudent).toEqual(
            expect.objectContaining({ id: "new-id", name: "Alice Johnson", email: "       alice@example.com", schoolId: "school-1" })
        );
    });

    // Test for updating a student