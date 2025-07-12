// Test cases for countryResolver using jest and context with mock database

import { countryResolvers } from "../src/resolvers/countryResolvers";
// Resolvers for Country entity
describe("Country Resolvers", () => {
  // Mock data for countries
    const mockCountries = [
        { id: "1", name: "USA" },
        { id: "2", name: "Canada" }
    ];

    const mockContext = {
        countries: mockCountries
    };
    // Mocking the context to simulate a database or data source

    it("returns country by ID", () => {
        const result = countryResolvers.Query.getCountry(
            null,
            { id: "1" },
            mockContext
        );

        expect(result).toEqual({ id: "1", name: "USA" });
    });
// Test for non-existing country
    it("returns undefined for non-existing country", () => {
        const result = countryResolvers.Query.getCountry(
            null,
            { id: "3" },
            mockContext
        );

        expect(result).toBeUndefined();
    });
// Test for getting all countries
    it("returns all countries", () => {
        const result = countryResolvers.Query.getCountries(null, null, mockContext);

        expect(result).toEqual(mockCountries);
    });


// Additional tests can be added for createCountry, updateCountry, and deleteCountry mutations
// For example, you can mock the database operations and check if the mutations return the expected results
  
it("creates a new country", async () => {
        const newCountry = { name: "Mexico", code: "MX" };
        const result = await countryResolvers.Mutation.createCountry(
            null,
            newCountry,
            mockContext
        );

        expect(result).toHaveProperty("id");
        expect(result.name).toBe(newCountry.name);
        expect(result.code).toBe(newCountry.code);
    });
// Test for updating a country
    it("updates an existing country", async () => {
        const updatedCountry = { id: "1", name: "United States", code: "US" };
        const result = await countryResolvers.Mutation.updateCountry(
            null,
            updatedCountry,
            mockContext
        );
        // Check if the country was updated correctly
        expect(result).toEqual({ id: "1", name: "United States", code: "US" });
    });
    // Test for deleting a country
    it("deletes a country", async () => {
        const result = await countryResolvers.Mutation.deleteCountry(
            null,
            { id: "2" },
            mockContext
        );
        // Check if the country was deleted correctly
        expect(result).toEqual({ id: "2", name: "Canada" });
    });
    it("throws error when creating a country with existing name or code", async () => {
        const existingCountry = { name: "USA", code: "US" };
        await expect(countryResolvers.Mutation.createCountry(
            null,
            existingCountry,
            mockContext
        )).rejects.toThrow("Country with name \"USA\" or code \"US\" already exists.");
    });
}); 