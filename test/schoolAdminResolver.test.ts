import {schoolAdminResolvers} from '../src/resolvers/schoolAdminResolvers';
import {v4 as uuidv4} from 'uuid';

//Test cases for schoolAdminResolver using jest and context with mock database
describe("School Admin Resolvers", () => {
    //Mock data
    const mockSchoolAdmins = [
        { id: "1", name: "John Doe", email: "john@example.com", schoolId: "school-1", createdAt: new Date().toISOString(), createdBy: "user-1" },
        { id: "2", name: "Jane Smith", email: "jane@example.com", schoolId: "school-2", createdAt: new Date().toISOString(), createdBy: "user-2" }
    ];

    const mockContext = {
        user: { id: "user-1" }, // Simulating a logged-in user
        db: {
            query: jest.fn((query, params) => {
                if (query.startsWith("SELECT")) {
                    // Simulate a SELECT query
                    if (params[0] === "1") {
                        return [mockSchoolAdmins.filter(admin => admin.id === "1")];
                    }
                    return [mockSchoolAdmins];
                }
                // Simulate an INSERT query
                if (query.startsWith("INSERT")) {
                    const newAdmin = {
                        id: uuidv4(),
                        name: params[1],
                        email: params[2],
                        schoolId: params[3],
                        createdAt: new Date().toISOString(),
                        createdBy: params[4]
                    };
                    mockSchoolAdmins.push(newAdmin);
                    return [newAdmin];
                }
                return [null];
            })
        }
    };
    // Test for creating a school admin
    it("creates a school admin", async () => {
        const newAdmin = await schoolAdminResolvers.Mutation.createSchoolAdmin(
            { name: "Alice Johnson", email: "alice@example.com", schoolId: "school-1" },
            mockContext
        );

        expect(newAdmin).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: "Alice Johnson",
            email: "alice@example.com",
            schoolId: "school-1",
            createdAt: expect.any(String),
            createdBy: "user-1"
        }));
    });
    // Test for getting a school admin by ID
    it("gets a school admin by ID", async () => {
        const admin = await schoolAdminResolvers.Query.getSchoolAdmin(
            { id: "1" },
            mockContext
        );

        expect(admin).toEqual(expect.objectContaining({
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            schoolId: "school-1",
            createdAt: expect.any(String),
            createdBy: "user-1"
        }));
    });
    // Test for getting all school admins
    it("gets all school admins", async () => {
        const admins = await schoolAdminResolvers.Query.getSchoolAdmins(mockContext);

        expect(admins).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: "1",
                name: "John Doe",
                email: "john@example.com",
                schoolId: "school-1",
                createdAt: expect.any(String),
                createdBy: "user-1"
            }),
            expect.objectContaining({
                id: "2",
                name: "Jane Smith",
                email: "jane@example.com",
                schoolId: "school-2",
                createdAt: expect.any(String),
                createdBy: "user-2"
            })
        ]));
    });
    // Test for unauthorized access
    it("throws an error if user is not authenticated", async () => {
        const context = { db: mockContext.db }; // No user in context
        await expect(schoolAdminResolvers.Query.getSchoolAdmin({ id: "1" }, context)).rejects.toThrow("Unauthorized: Please log in.");
    });
    // Test for updating a school admin
    it("updates a school admin", async () => {
        const updatedAdmin = await schoolAdminResolvers.Mutation.updateSchoolAdmin(
            { id: "1", name: "John Updated", email: "john.updated@example.com" },
            mockContext
        );

        expect(updatedAdmin).toEqual(expect.objectContaining({
            id: "1",
            name: "John Updated",
            email: "john.updated@example.com",
            schoolId: "school-1",
            createdAt: expect.any(String),
            createdBy: "user-1"
        }));
        
    });
    // Test for deleting a school admin
    it("deletes a school admin", async () => {
        const deletedAdmin = await schoolAdminResolvers.Mutation.deleteSchoolAdmin(
            { id: "2" },
            mockContext
        );

        expect(deletedAdmin).toEqual(expect.objectContaining({
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            schoolId: "school-2",
            createdAt: expect.any(String),
            createdBy: "user-2"
        }));

    }); 

});
