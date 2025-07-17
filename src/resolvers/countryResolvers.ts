import { Country } from "../interfaces/interface";
import { v4 as uuidv4 } from "uuid";


export const countryResolvers = {
  // Get a single country by ID

  Query: {
    getCountry: async (_: any, { id }: { id: string }, context: any): Promise<Country | undefined> => {
      if (!id) {
        throw new Error("Country ID is required.");
      }
      if (!context.user) {
        throw new Error("Unauthorized: Please log in.");
      }
      const [rows] = await context.db.query("SELECT * FROM countries WHERE id = ?", [id]);
      if (rows.length === 0) {
        throw new Error(`Country with ID ${id} does not exist.`);
      }
      // Find and return the country by ID
      return rows[0];
    },
    getCountries: async (_: any, __: any, context: any): Promise<Country[]> => {
      // if (!context.user) {
      //   throw new Error("Unauthorized: Please log in.");
      // }
      try {
        const [rows] = await context.db.query("SELECT * FROM countries");
        if (rows.length === 0) {
          throw new Error("No countries found.");
        }
        // Return all countries
        return rows;
      } catch (error) {
        console.error("Error fetching countries:", error);
        throw new Error("Failed to fetch countries.");
      }

    }
  },
  Mutation: {
    createCountry: async (_: any, { name, code }: { name: string; code: string }, context: any): Promise<Country> => {
      // if (!context.user) {
      //   throw new Error("Unauthorized: Please log in.");
      // }
      if (!name || !code) {
        throw new Error("Name and code are required to create a country.");
      }
      // Check if the country already exists
      const [existingCountries] = await context.db.query("SELECT * FROM countries WHERE name = ? OR code = ?", [name, code]);
      if (existingCountries.length > 0) {
        throw new Error(`Country with name "${name}" or code "${code}" already exists.`);
      }
      // Create a new country object
      const newCountry: Country = {
        id: uuidv4(),
        name,
        code,
        createdAt: new Date(),
        createdBy: "system" // This can be modified to include the actual creator's ID
      };
      // Insert the new country into the database
      await context.db.query("INSERT INTO countries (id, name, code, createdAt, createdBy) VALUES (?, ?, ?, ?, ?)", [
        newCountry.id,
        newCountry.name,
        newCountry.code,
        newCountry.createdAt,
        newCountry.createdBy
      ]);

      return newCountry;
    },

    updateCountry: async (_: any, { id, name, code }: { id: string; name?: string; code?: string }, context: any): Promise<Country | null> => {
      if (!context.user) {
        throw new Error("Unauthorized: Please log in.");
      }
      if (!id) {
        throw new Error("Country ID is required for updating.");
      }
      if (!name && !code) {
        throw new Error("At least one of name or code must be provided for updating a country.");
      }
      // Check if the country exists
      const [existingCountries] = await context.db.query("SELECT * FROM countries WHERE id = ?", [id]);
      if (existingCountries.length === 0) {
        throw new Error(`Country with ID ${id} does not exist.`);
      }
      // Update the country in the database
      const update = await context.db.query("UPDATE countries SET name = ?, code = ? WHERE id = ?", [name, code, id]);

      if (update.affectedRows === 0) {
        throw new Error(`Failed to update country with ID ${id}.`);
      }
      // Return Successfully updated country
      return {
        id,
        name: name || existingCountries[0].name,
        code: code || existingCountries[0].code,
        createdAt: existingCountries[0].createdAt,
        createdBy: existingCountries[0].createdBy
      };
    },

    deleteCountry: async (_: any, { id }: { id: string }, context: any): Promise<Country | null> => {
      if (!context.user) {
        throw new Error("Unauthorized: Please log in.");
      }
      if (!id) {
        throw new Error("Country ID is required for deletion.");
      }
      // Check if the country exists
      const [existingCountries] = await context.db.query("SELECT * FROM countries WHERE id = ?", [id]);
      if (existingCountries.length === 0) {
        throw new Error(`Country with ID ${id} does not exist.`);
      }
      // Delete the country from the database
      await context.db.query("DELETE FROM countries WHERE id = ?", [id]);
      return existingCountries[0];
    }
  }
};
