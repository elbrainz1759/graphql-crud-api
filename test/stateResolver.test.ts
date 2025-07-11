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
});