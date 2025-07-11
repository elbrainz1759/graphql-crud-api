import { stateResolvers } from "../src/resolvers/stateResolvers"

describe("State Resolvers", () => {
    const mockStates = [
        { id: "1", name: "California" },
        { id: "2", name: "Texas" }
    ];

    const mockContext = {
        states: mockStates
    };

    it("returns state by ID", () => {
        const result = stateResolvers.Query.getState(
            { id: "1" },
            mockContext
        );

        expect(result).toEqual({ id: "1", name: "California" });
    });

    it("returns undefined for non-existing state", () => {
        const result = stateResolvers.Query.getState(
            { id: "3" },
            mockContext
        );

        expect(result).toBeUndefined();
    });

    it("returns all states", () => {
        const result = stateResolvers.Query.getStates(mockContext);

        expect(result).toEqual(mockStates);
    });
});