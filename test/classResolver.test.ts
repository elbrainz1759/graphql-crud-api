import { classResolvers } from "../src/resolvers/classResolvers";

//Test cases for classResolver using jest and context with mock database
describe("Class Resolvers", () => {
    //Mock data
    const mockClasses = [
        { id: "1", name: "Math 101", teacherId: "teacher-1", createdAt: new Date().toISOString(), createdBy: "user-1" },
        { id: "2", name: "Science 101", teacherId: "teacher-2", createdAt: new Date().toISOString(), createdBy: "user-1" }
    ];
    const mockContext = {
        user: { id: "user-1" }, // Simulating a logged-in user
        db: {
            query: jest.fn((query, params) => {
                if (query.includes("SELECT * FROM classes WHERE id = ?")) {
                    return [mockClasses.filter(cls => cls.id === params[0])];
                } else if (query.includes("SELECT * FROM classes")) {
                    return [mockClasses];
                } else if (query.includes("INSERT INTO classes SET ?")) {
                    const newClass = { ...params[0], id: "new-id" };
                    mockClasses.push(newClass);
                    return [newClass];
                } else if (query.includes("UPDATE classes SET")) {
                    const cls = mockClasses.find(c => c.id === params[0].id);
                    if (cls) {
                        Object.assign(cls, params[0]);
                        return [cls];
                    }
                }
                return [[]];
            }),
        },
    };

    // Test for creating a class
    it("creates a class", async () => {
        const newClass = await classResolvers.Mutation.createClass(
            { name: "History 101", schoolId: "school-1", createdBy: "user-1", createdAt: new Date().toISOString() },
            mockContext
        );
        expect(newClass).toEqual(
            expect.objectContaining({ id: "new-id", name: "History 101", schoolId: "school-1", createdBy: "user-1", createdAt: expect.any(String) })
        );
    })


})


