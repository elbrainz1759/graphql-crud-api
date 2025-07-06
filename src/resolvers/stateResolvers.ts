import sampleData from "../../db";
import { State } from "../interfaces/interface";
import { v4 as uuidv4 } from "uuid";


export const stateResolvers = {
    Query: {
        getState: async({ id }: { id: string }, context: any): Promise<State | undefined> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("State ID is required.");
            }
            // Find and return the state by ID
            const [rows] = await context.db.query("SELECT * FROM states WHERE id = ?", [id]);
            if (rows.length === 0) {
                throw new Error(`State with ID ${id} does not exist.`);
            }
            return rows[0];
        },

        getStates: async(context: any): Promise<State[]> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            const [rows] = await context.db.query("SELECT * FROM states");
            if (rows.length === 0) {
                throw new Error("No states found.");
            }
            return rows;
        },
    },
    Mutation: {
        createState: async({ name, countryId }: Omit<State, "id">, context: any): Promise<State> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!name || !countryId) {
                throw new Error("Name and countryId are required to create a state.");
            }
            if (!context.countries.some((c:any) => c.id === countryId)) {
                throw new Error(`Country with ID ${countryId} does not exist.`);
            }
            if (!name || !countryId) {
                throw new Error("Name and countryId are required to create a state.");
            }
            // Check if the state already exists
            const [states] = await context.db.query("SELECT * FROM states WHERE name = ? AND countryId = ?", [name, countryId]);
            if (states.length > 0) {
                throw new Error(`State with name "${name}" already exists in country with ID ${countryId}.`);
            }
            //check if country exists
            const [countries] = await context.db.query("SELECT * FROM countries WHERE id = ?", [countryId]);
            if (countries.length === 0) {
                throw new Error(`Country with ID ${countryId} does not exist.`);
            }

            // Create a new state object
            const [newState] = await context.db.query("INSERT INTO states (id, name, countryId, createdAt, createdBy) VALUES (?, ?, ?, ?, ?)", [
                uuidv4(),
                name,
                countryId,
                new Date().toISOString(),
                "system" // This can be modified to include the actual creator's ID
            ]);
            states.push(newState);
            return newState;
        },

        updateState: async({ id, name, countryId }: Partial<State> & { id: string }, context: any): Promise<State | null> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("State ID is required for updating.");
            }
            if (!name && !countryId) {
                throw new Error("At least one of name or countryId must be provided for updating a state.");
            }
            const [rows] = await context.db.query("SELECT * FROM states WHERE id = ?", [id]);
            if (rows.length === 0) {
                throw new Error(`State with ID ${id} does not exist.`);
            }
            const state = rows[0];
            const updateStates = await context.db.query("UPDATE states SET name = ?, countryId = ? WHERE id = ?", [
                name || state.name,
                countryId || state.countryId,
                id      
            ]);
            if (updateStates.affectedRows === 0) {
                throw new Error(`Failed to update state with ID ${id}.`);
            }
            // Return the updated state
            return {
                id: state.id,
                name: name || state.name,
                countryId: countryId || state.countryId,
                createdAt: state.createdAt,         
                createdBy: state.createdBy
            };

        },

        deleteState: async({ id }: { id: string }, context: any): Promise<State | null> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("State ID is required for deletion.");
            }
            // Check if the state exists
            const [rows] = await context.db.query("SELECT * FROM states WHERE id = ?", [id]);
            if (rows.length === 0) {
                throw new Error(`State with ID ${id} does not exist.`);
            }
            // Delete the state from the database
            const deleteState = await context.db.query("DELETE FROM states WHERE id = ?", [id]);
            if (deleteState.affectedRows === 0) {
                throw new Error(`Failed to delete state with ID ${id}.`);
            }
            // Return the deleted state object
            return {    
                id: rows[0].id,
                name: rows[0].name,
                countryId: rows[0].countryId,
                createdAt: rows[0].createdAt,
                createdBy: rows[0].createdBy
            };
        }
    }
};
