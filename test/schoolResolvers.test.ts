// schoolResolvers.test.ts
import { schoolResolvers } from "../src/resolvers/schoolResolvers";

// Resolvers for School entity
describe("School Resolvers", () => {
    // Mock data for schools
    // This data simulates a database or data source
    // In a real application, this would be replaced with actual database queries
    // or API calls to fetch the schools.
    const mockSchools = [
        { id: "1", name: "Alpha School" },
        { id: "2", name: "Beta School" }
    ];

    const mockContext = {
        schools: mockSchools
    };
    // Mocking the context to simulate a database or data source

    it("returns school by ID", () => {
        const result = schoolResolvers.Query.getSchool(
            null,
            { id: "1" },
            mockContext
        );

        expect(result).toEqual({ id: "1", name: "Alpha School" });
    });
// Test for non-existing school
    it("returns undefined for non-existing school", () => {
        const result = schoolResolvers.Query.getSchool(
            null,
            { id: "3" },
            mockContext
        );

        expect(result).toBeUndefined();
    });
// Test for getting all schools

    it("returns all schools", () => {
        const result = schoolResolvers.Query.getSchools(null, null, mockContext);

        expect(result).toEqual(mockSchools);
    });
    // Test for getting schools by state, country, and createdBy
    it("returns schools by state", () => {
        const mockSchoolsByState = [
            { id: "1", name: "Alpha School", state: "California" },
            { id: "2", name: "Beta School", state: "California" }
        ];
        const contextWithState = { schools: mockSchoolsByState };

        const result = schoolResolvers.Query.getSchoolsByState(
            null,
            { state: "California" },
            contextWithState
        );

        expect(result).toEqual(mockSchoolsByState);
    });
    // Test for getting schools by country
    it("returns schools by country", () => {
        const mockSchoolsByCountry = [
            { id: "1", name: "Alpha School", country: "USA" },
            { id: "2", name: "Beta School", country: "USA" }
        ];
        const contextWithCountry = { schools: mockSchoolsByCountry };

        const result = schoolResolvers.Query.getSchoolsByCountry(
            null,
            { country: "USA" },
            contextWithCountry
        );

        expect(result).toEqual(mockSchoolsByCountry);
    });
    // Test for getting schools by createdBy
    it("returns schools by createdBy", () => {
        const mockSchoolsByCreator = [
            { id: "1", name: "Alpha School", createdBy: "admin" },
            { id: "2", name: "Beta School", createdBy: "admin" }
        ];
        const contextWithCreator = { schools: mockSchoolsByCreator };

        const result = schoolResolvers.Query.getSchoolsByCreatedBy(
            null,
            { createdBy: "admin" },
            contextWithCreator
        );

        expect(result).toEqual(mockSchoolsByCreator);
    });
    // Test for creating a school
    it("creates a new school", () => {
        const newSchool = { name: "Gamma School", state: "California", country: "USA", createdBy: "admin" };
        const result = schoolResolvers.Mutation.createSchool(
            null,
            newSchool,
            mockContext,
            {
                name: "Gamma School",
                address: "123 Main St",
                country: "USA",
                phone: "123-456-7890",
                website: "www.gammaschool.com",
                state: "California",
                createdBy: "admin",
                createdAt: new Date().toISOString()
            }
        );

        expect(result).toHaveProperty("id");
        expect(result.name).toBe(newSchool.name);
        expect(result.state).toBe(newSchool.state);
        expect(result.country).toBe(newSchool.country);
        expect(result.createdBy).toBe(newSchool.createdBy);
    });
});
