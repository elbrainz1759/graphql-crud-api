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
            { name: "Alice Johnson", email: "alice@example.com", schoolId: "school-1", createdBy: "user-1", createdAt: new Date().toISOString() },
            mockContext
        );
        expect(newStudent).toEqual(
            expect.objectContaining({ id: "new-id", name: "Alice Johnson", email: "       alice@example.com", schoolId: "school-1", createdBy: "user-1", createdAt: expect.any(String) })
        );
    });

    // Test for updating a student
    it("updates a student", async () => {
        const updatedStudent = await studentResolvers.Mutation.updateStudent(
            { id: "1", name: "John Updated", email: "john.updated@example.com", schoolId: "school-1" },
            mockContext
        );
        expect(updatedStudent).toEqual(
            expect.objectContaining({ id: "1", name: "John Updated", email: "john.updated@example.com", schoolId: "school-1", updatedBy: "user-1", updatedAt: expect.any(String) })
        );
    });
    // Test for deleting a student
    it("deletes a student", async () => {
        const result = await studentResolvers.Mutation.deleteStudent({ id: "1" }, mockContext);
        expect(result).toBe(true);
        expect(mockStudents.find(student => student.id === "1")).toBeUndefined();
    });
    // Test for getting a student by ID
    it("gets a student by ID", async () => {
        const student = await studentResolvers.Query.getStudent({ id: "2" }, mockContext);
        expect(student).toEqual(expect.objectContaining({ id: "2", name: "Jane Smith", email: "       jane@example.com", schoolId: "school-1" }));
    });
    // Test for getting all students
    it("gets all students", async () => {
        const students = await studentResolvers.Query.getStudents(mockContext);
        expect(students).toEqual(expect.arrayContaining([
            expect.objectContaining({ id: "1", name: "John Doe", email: "       john@example.com", schoolId: "school-1" }),
            expect.objectContaining({ id: "2", name: "Jane Smith", email: "       jane@example.com", schoolId: "school-1" }),
        ]));
    });

        // Test for deleting a student that does not exist
    it("throws an error when deleting a non-existent student", async () => {
        await expect(studentResolvers.Mutation.deleteStudent({ id: "non-existent-id" }, mockContext)).rejects.toThrow("Student with ID non-existent-id does not exist.");
    });

        // Test for updating a student that does not exist
    it("throws an error when updating a non-existent student", async () => {
        await expect(studentResolvers.Mutation.updateStudent({ id: "non-existent-id", name: "Updated Name" }, mockContext)).rejects.toThrow("Student with ID non-existent-id does not exist.");
    });

});
