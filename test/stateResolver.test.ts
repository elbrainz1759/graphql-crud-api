import { stateResolvers } from "../src/resolvers/stateResolvers"

// Resolvers for State entity
describe("State Resolvers", () => {
    // Mock data for states
    // This data simulates a database or data source
    // In a real application, this would be replaced with actual database queries
    // or API calls to fetch the states.
    const mockStates = [
        { id: "1", name: "California" },
        { id: "2", name: "Texas" }
    ];

    const mockContext = {
        states: mockStates
    };

    // Mocking the context to simulate a database or data source
    it("returns state by ID", () => {
        const result = stateResolvers.Query.getState(
            { id: "1" },
            mockContext
        );

        expect(result).toEqual({ id: "1", name: "California" });
    });

// Test for non-existing state
    it("returns undefined for non-existing state", () => {
        const result = stateResolvers.Query.getState(
            { id: "3" },
            mockContext
        );

        expect(result).toBeUndefined();
    });

    // Test for getting all states
    it("returns all states", () => {
        const result = stateResolvers.Query.getStates(mockContext);

        expect(result).toEqual(mockStates);
    });

    // Test for creating a state
    it("creates a state", async () => {
        const newState = await stateResolvers.Mutation.createState(
            { name: "Florida", countryId: "US", createdBy: "system" , createdAt: new Date().toISOString() },
            mockContext
        );
        expect(newState).toEqual(
            expect.objectContaining({ id: expect.any(String), name: "Florida" })
        );
    });
    // Test for updating a state
    it("updates a state", async () => {
        const updatedState = await stateResolvers.Mutation.updateState(
            { id: "1", name: "California Updated" },
            mockContext
        );
        expect(updatedState).toEqual(
            expect.objectContaining({ id: "1", name: "California Updated" })
        );
    });
});