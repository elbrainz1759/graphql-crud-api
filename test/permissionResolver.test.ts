import { permissionResolvers } from "../src/resolvers/permissionResolvers";
// Resolvers for Permission entity
describe("Permission Resolvers", () => {
    // Mock data for permissions
    // This data simulates a database or data source
    // In a real application, this would be replaced with actual database queries
    // or API calls to fetch the permissions.
    const mockPermissions = [
        { id: "1", name: "Read" },
        { id: "2", name: "Write" }
    ];

    const mockContext = {
        permissions: mockPermissions
    };
// Mocking the context to simulate a database or data source
    it("returns permission by ID", () => {
        const result = permissionResolvers.Query.getPermission(
            null,
            { id: "1" },
            mockContext
        );

        expect(result).toEqual({ id: "1", name: "Read" });
    });
// Test for non-existing permission
    it("returns undefined for non-existing permission", () => {
        const result = permissionResolvers.Query.getPermission(
            null,
            { id: "3" },
            mockContext
        );

        expect(result).toBeUndefined();
    });
// Test for getting all permissions
    it("returns all permissions", () => {
        const result = permissionResolvers.Query.getPermissions( mockContext);

        expect(result).toEqual(mockPermissions);
    });
});