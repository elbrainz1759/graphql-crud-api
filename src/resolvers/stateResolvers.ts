import sampleData from "../../db";
import { State } from "../interfaces/interface";
import { v4 as uuidv4 } from "uuid";

let states: State[] = sampleData.states || [];

export const stateResolvers = {
    Query: {
        getState: ({ id }: { id: string }, context: any): State | undefined => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            return states.find(s => s.id === id);
        },

        getStates: (context: any): State[] => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            return states;
        },
    },
    Mutation: {
        createState: ({ name, countryId }: Omit<State, "id">, context: any): State => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!name || !countryId) {
                throw new Error("Name and countryId are required to create a state.");
            }
            if (states.some(s => s.name === name && s.countryId === countryId)) {
                throw new Error(`State with name "${name}" already exists in country with ID ${countryId}.`);
            }
            if (!context.countries.some((c:any) => c.id === countryId)) {
                throw new Error(`Country with ID ${countryId} does not exist.`);
            }
            // Create a new state object
            const newState: State = {
                id: uuidv4(),
                name,
                countryId,
                createdAt: new Date().toISOString(),
                createdBy: "system" // This can be modified to include the actual creator's ID    
            };
            states.push(newState);
            return newState;
        },

        updateState: ({ id, name, countryId }: Partial<State> & { id: string }, context: any): State | null => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("State ID is required for updating.");
            }
            if (!name && !countryId) {
                throw new Error("At least one of name or countryId must be provided for updating a state.");
            }
            const state = states.find(s => s.id === id);
            if (!state) return null;
            if (name) state.name = name;
            if (countryId) state.countryId = countryId;
            return state;
        },

        deleteState: ({ id }: { id: string }, context: any): State | null => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("State ID is required for deletion.");
            }
            if (!states.some(s => s.id === id)) {
                throw new Error(`State with ID ${id} does not exist.`);
            }
            const index = states.findIndex(s => s.id === id);
            if (index === -1) return null;
            return states.splice(index, 1)[0];
        }
    }
};
