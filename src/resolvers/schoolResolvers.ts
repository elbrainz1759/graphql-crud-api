import sampleData from "../../db";
import { Country, School, State } from "../interfaces/interface";
import { v4 as uuidv4 } from "uuid";

let schools: School[] = sampleData.schools || [];
let states: State[] = sampleData.states || [];
let countries: Country[] = sampleData.countries || [];

export const schoolResolvers = {
  Query: {
    getSchool: (_: any, { id }: { id: string }): School | undefined => {
      return schools.find(s => s.id === id);
    },

    getSchools: (): School[] => {
      return schools;
    },

    getSchoolsByState: (_: any, { state }: { state: string }): School[] => {
      return schools.filter(s => s.state === state);
    },

    getSchoolsByCountry: (_: any, { country }: { country: string }): School[] => {
      return schools.filter(s => s.country === country);
    },

    getSchoolsByCreatedBy: (_: any, { createdBy }: { createdBy: string }): School[] => {
      return schools.filter(s => s.createdBy === createdBy);
    }
  },

  Mutation: {
    createSchool: (
      _: any,
      {
        name,
        address,
        country,
        phone,
        website,
        state,
        createdBy,
        createdAt
      }: Omit<School, "id">
    ): School => {
      const newSchool: School = {
        id: uuidv4(),
        name,
        address,
        country,
        phone,
        website,
        state,
        createdAt,
        createdBy
      };
      schools.push(newSchool);
      return newSchool;
    },

    updateSchool: (
      _: any,
      {
        id,
        name,
        address,
        country,
        phone,
        website,
        state
      }: Partial<School> & { id: string }
    ): School | null => {
      const school = schools.find(s => s.id === id);
      if (!school) return null;

      if (name) school.name = name;
      if (address) school.address = address;
      if (country) school.country = country;
      if (phone) school.phone = phone;
      if (website) school.website = website;
      if (state) school.state = state;

      return school;
    },

    deleteSchool: (_: any, { id }: { id: string }): School | null => {
      const index = schools.findIndex(s => s.id === id);
      if (index === -1) return null;
      const deleted = schools[index];
      schools.splice(index, 1);
      return deleted;
    }
  },

  School: {
    state: (school: School): State => {
      return states.find(s => s.id === school.state)!;
    },
    country: (school: School): Country => {
      return countries.find(c => c.id === school.country)!;
    }
  }
};

