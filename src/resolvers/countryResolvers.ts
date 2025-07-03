import sampleData from "../../db";
import { Country } from "../interfaces/interface";
import { v4 as uuidv4 } from "uuid";

let countries: Country[] = sampleData.countries || [];

export const countryResolvers = {
  // Get a single country by ID

  Query:{
    getCountry: (_: any, { id }: { id: string }, context: any): Country | undefined => {
      if (!id) {
        throw new Error("Country ID is required.");
      }
      if (!context.countries) {
        throw new Error("Countries data is not available in the context.");
      }
       if (!context.user) {
    throw new Error("Unauthorized: Please log in.");
  }
      return context.countries.find((c: any) => c.id === id);
    },
    getCountries: (_: any, __: any, context: any): Country[] => {
      if (!context.user) {
        throw new Error("Unauthorized: Please log in.");
      }
      return context.countries;
    }
  },
  Mutation:{
    createCountry: (_: any, { name, code }: { name: string; code: string }, context: any): Country => {
      if (!context.user) {
        throw new Error("Unauthorized: Please log in.");
      }
      if (!name || !code) {
        throw new Error("Name and code are required to create a country.");
      }
      if (countries.some(c => c.name === name || c.code === code)) {
        throw new Error(`Country with name "${name}" or code "${code}" already exists.`);
      }
      const newCountry: Country = {
        id: uuidv4(),
        name,
        code,
        createdAt: new Date().toISOString(),
        createdBy: "system" // This can be modified to include the actual creator's ID
      };
      countries.push(newCountry);
      return newCountry;
    },

    updateCountry: (_: any, { id, name, code }: { id: string; name?: string; code?: string }, context: any): Country | null => {
      if (!context.user) {
        throw new Error("Unauthorized: Please log in.");
      }
      if (!id) {
        throw new Error("Country ID is required for updating.");
      }
      if (!name && !code) {
        throw new Error("At least one of name or code must be provided for updating a country.");
      }
      const country = countries.find(c => c.id === id);
      if (!country) return null;
      if (name) country.name = name;
      if (code) country.code = code;
      return country;
    },

    deleteCountry: (_: any, { id }: { id: string }, context: any): Country | null => {
      if (!context.user) {
        throw new Error("Unauthorized: Please log in.");
      }
      if (!id) {
        throw new Error("Country ID is required for deletion.");
      }
      if (!countries.some(c => c.id === id)) {
        throw new Error(`Country with ID ${id} does not exist.`);
      }
      const index = countries.findIndex(c => c.id === id);
      if (index === -1) return null;
      const deleted = countries[index];
      countries.splice(index, 1);
      return deleted;
    }
  }
};
