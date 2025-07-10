import { permissionResolvers } from "../src/resolvers/permissionResolvers";

describe("Permission Resolvers", () => {
    const mockPermissions = [
        { id: "1", name: "Read" },
        { id: "2", name: "Write" }
    ];

    const mockContext = {
        permissions: mockPermissions
    };

    it("returns permission by ID", () => {
        const result = permissionResolvers.Query.getPermission(
            null,
            { id: "1" },
            mockContext
        );

        expect(result).toEqual({ id: "1", name: "Read" });
    });

    it("returns undefined for non-existing permission", () => {
        const result = permissionResolvers.Query.getPermission(
            null,
            { id: "3" },
            mockContext
        );

        expect(result).toBeUndefined();
    });

    it("returns all permissions", () => {
        const result = permissionResolvers.Query.getPermissions( mockContext);

        expect(result).toEqual(mockPermissions);
    });
});