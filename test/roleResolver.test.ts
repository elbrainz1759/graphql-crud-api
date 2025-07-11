import { roleResolvers } from "../src/resolvers/roleResolvers";

// Resolvers for Role entity
// This file contains tests for the role resolvers, which handle operations related to roles in the application.
// The tests cover fetching roles by ID, fetching all roles, and handling cases where roles do
describe("Role Resolvers", () => {
    // Mock data for roles
    const mockRoles = [
        { id: "1", name: "Admin" },
        { id: "2", name: "User" }
    ];

    const mockContext = {
        roles: mockRoles
    };
// Mocking the context to simulate a database or data source
    it("returns role by ID", () => {
        const result = roleResolvers.Query.getRole(
            { id: "1" },
            mockContext
        );

        expect(result).toEqual({ id: "1", name: "Admin" });
    });
// Test for non-existing role
    it("returns undefined for non-existing role", () => {
        const result = roleResolvers.Query.getRole(
            { id: "3" },
            mockContext
        );

        expect(result).toBeUndefined();
    });

// Test for getting all roles
    it("returns all roles", () => {
        const result = roleResolvers.Query.getRoles(mockContext);

        expect(result).toEqual(mockRoles);
    });
});