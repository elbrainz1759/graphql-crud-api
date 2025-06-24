import { Country } from "../types/types";
import { v4 as uuidv4 } from "uuid";

let countries: Country[] = [];

export const countryResolvers = {
  // Get a single country by ID
  getCountry: ({ id }: { id: string }): Country | undefined => {
    return countries.find(c => c.id === id);
  },

  // Get all countries
  getCountries: (): Country[] => {
    return countries;
  },

  // Create a new country
  createCountry: ({ name, code }: { name: string; code: string }): Country => {
    const newCountry: Country = {
      id: uuidv4(),
      name,
      code
    };
    countries.push(newCountry);
    return newCountry;
  },

  // Update a country by ID
  updateCountry: ({ id, name, code }: { id: string; name?: string; code?: string }): Country | null => {
    const country = countries.find(c => c.id === id);
    if (!country) return null;
    if (name) country.name = name;
    if (code) country.code = code;
    return country;
  },

  // Delete a country by ID
  deleteCountry: ({ id }: { id: string }): Country | null => {
    const index = countries.findIndex(c => c.id === id);
    if (index === -1) return null;
    const deleted = countries[index];
    countries.splice(index, 1);
    return deleted;
  }
};
