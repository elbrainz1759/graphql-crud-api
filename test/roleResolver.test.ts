import { roleResolvers } from "../src/resolvers/roleResolvers";

describe("Role Resolvers", () => {
    const mockRoles = [
        { id: "1", name: "Admin" },
        { id: "2", name: "User" }
    ];

    const mockContext = {
        roles: mockRoles
    };

    it("returns role by ID", () => {
        const result = roleResolvers.Query.getRole(
            { id: "1" },
            mockContext
        );

        expect(result).toEqual({ id: "1", name: "Admin" });
    });

    it("returns undefined for non-existing role", () => {
        const result = roleResolvers.Query.getRole(
            { id: "3" },
            mockContext
        );

        expect(result).toBeUndefined();
    });

    it("returns all roles", () => {
        const result = roleResolvers.Query.getRoles(mockContext);

        expect(result).toEqual(mockRoles);
    });
});