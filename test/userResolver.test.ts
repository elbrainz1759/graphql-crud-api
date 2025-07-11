import { userResolvers } from "../src/resolvers/userResolvers";

describe("User Resolvers", () => {
    const mockUsers = [
        { id: "1", name: "Alice", email: "alice@example.com" },
        { id: "2", name: "Bob", email: "bob@example.com" }
    ];

    const mockContext = {
        users: mockUsers
    };

    it("returns user by ID", () => {
        const result = userResolvers.Query.getUser(
            { id: "1" },
            mockContext
        );

        expect(result).toEqual({ id: "1", name: "Alice", email: "alice@example.com" });
    });

    it("returns undefined for non-existing user", () => {
        const result = userResolvers.Query.getUser(
            { id: "3" },
            mockContext
        );

        expect(result).toBeUndefined();
    });

    it("returns all users", () => {
        const result = userResolvers.Query.getUsers(mockContext);

        expect(result).toEqual(mockUsers);
    });
});