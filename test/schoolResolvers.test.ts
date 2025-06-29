// schoolResolvers.test.ts
import { schoolResolvers } from "../src/resolvers/schoolResolvers";

describe("School Resolvers", () => {
    const mockSchools = [
        { id: "1", name: "Alpha School" },
        { id: "2", name: "Beta School" }
    ];

    const mockContext = {
        schools: mockSchools
    };

    it("returns school by ID", () => {
        const result = schoolResolvers.Query.getSchool(
            null,
            { id: "1" },
            mockContext
        );

        expect(result).toEqual({ id: "1", name: "Alpha School" });
    });

    it("returns undefined for non-existing school", () => {
        const result = schoolResolvers.Query.getSchool(
            null,
            { id: "3" },
            mockContext
        );

        expect(result).toBeUndefined();
    });

    it("returns all schools", () => {
        const result = schoolResolvers.Query.getSchools(null, null, mockContext);

        expect(result).toEqual(mockSchools);
    });
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
});
