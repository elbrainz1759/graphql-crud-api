import sampleData from "../../db";
import { School } from "../types/types";
import { v4 as uuidv4 } from "uuid";

let schools: School[] = sampleData.schools || [];

export const schoolResolvers = {
  // Get a school by ID
  getSchool: ({ id }: { id: string }): School | undefined => {
    return schools.find(s => s.id === id);
  },

  // Get all schools
  getSchools: (): School[] => {
    return schools;
  },

  // Create a new school
  createSchool: ({
    name,
    address,
    country,
    phone,
    website,
    state
  }: Omit<School, "id">): School => {
    const newSchool: School = {
      id: uuidv4(),
      name,
      address,
      country,
      phone,
      website,
      state,
      createdAt: new Date().toISOString(),
      createdBy: "system", // This can be modified to include the actual creator's ID
    };
    schools.push(newSchool);
    return newSchool;
  },

  // Update a school
  updateSchool: ({
    id,
    name,
    address,
    country,
    phone,
    website,
    state,
  }: Partial<School> & { id: string }): School | null => {
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

  // Delete a school
  deleteSchool: ({ id }: { id: string }): School | null => {
    const index = schools.findIndex(s => s.id === id);
    if (index === -1) return null;
    const deleted = schools[index];
    schools.splice(index, 1);
    return deleted;
  },
};
