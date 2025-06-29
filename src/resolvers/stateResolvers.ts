import sampleData from "../../db";
import { State } from "../types/types";
import { v4 as uuidv4 } from "uuid";

let states: State[] = sampleData.states || [];

export const stateResolvers = {
  getState: ({ id }: { id: string }): State | undefined =>
    states.find(s => s.id === id),

  getStates: (): State[] => states,

  createState: ({ name, countryId }: Omit<State, "id">): State => {
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

  updateState: ({ id, name, countryId }: Partial<State> & { id: string }): State | null => {
    const state = states.find(s => s.id === id);
    if (!state) return null;
    if (name) state.name = name;
    if (countryId) state.countryId = countryId;
    return state;
  },

  deleteState: ({ id }: { id: string }): State | null => {
    const index = states.findIndex(s => s.id === id);
    if (index === -1) return null;
    return states.splice(index, 1)[0];
  }
};
