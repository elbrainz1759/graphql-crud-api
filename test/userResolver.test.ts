import { userResolvers } from "../src/resolvers/userResolvers";
// Resolvers for User entity
describe("User Resolvers", () => {
    // Mock data for users
    const mockUsers = [
        { id: "1", name: "Alice", email: "alice@example.com" },
        { id: "2", name: "Bob", email: "bob@example.com" }
    ];

    const mockContext = {
        users: mockUsers
    };

    // Mocking the context to simulate a database or data source
    it("returns user by ID", () => {
        const result = userResolvers.Query.getUser(
            { id: "1" },
            mockContext
        );

        expect(result).toEqual({ id: "1", name: "Alice", email: "alice@example.com" });
    });

    // Test for non-existing user
    it("returns undefined for non-existing user", () => {
        const result = userResolvers.Query.getUser(
            { id: "3" },
            mockContext
        );

        expect(result).toBeUndefined();
    });

    // Test for getting all users
    it("returns all users", () => {
        const result = userResolvers.Query.getUsers(mockContext);

        expect(result).toEqual(mockUsers);
    });
});