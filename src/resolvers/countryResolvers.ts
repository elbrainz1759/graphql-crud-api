import sampleData from "../../db";
import { Country } from "../interfaces/interface";
import { v4 as uuidv4 } from "uuid";

let countries: Country[] = sampleData.countries || [];

export const countryResolvers = {
  // Get a single country by ID

  Query:{
    getCountry: (_: any, { id }: { id: string }): Country | undefined => {
      return countries.find(c => c.id === id);
    },
    getCountries: (): Country[] => {
      return countries;
    }
  },
  Mutation:{
    createCountry: (_: any, { name, code }: { name: string; code: string }): Country => {
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

    updateCountry: (_: any, { id, name, code }: { id: string; name?: string; code?: string }): Country | null => {
      const country = countries.find(c => c.id === id);
      if (!country) return null;
      if (name) country.name = name;
      if (code) country.code = code;
      return country;
    },

    deleteCountry: (_: any, { id }: { id: string }): Country | null => {
      const index = countries.findIndex(c => c.id === id);
      if (index === -1) return null;
      const deleted = countries[index];
      countries.splice(index, 1);
      return deleted;
    }
  }
};
