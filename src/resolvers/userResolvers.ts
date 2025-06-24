import { create } from "domain";
import {User} from "../types/types"
import {v4 as uuidv4} from "uuid";

let users: User[] = [];

export const root = {
    // The `getUser` function retrieves a user by their ID.
    // It takes an object with an `id` property and returns the corresponding User object.
    // If the user is not found, it returns undefined.
    getUser: ({ id }: { id: string }) => {
        return users.find(user => user.id === id);
    },
    // The `getUsers` function returns the list of all users.
    // It does not take any arguments and returns an array of User objects.
    getUsers: () => {
        return users;
    },
    // The `createUser` function creates a new user with a unique ID, name, and email.
    // It returns the newly created user object.

    createUser: ({ name, email }: { name: string; email: string }) => {
        const newUser: User = {
            id: uuidv4(),
            name,
            email
        };
        users.push(newUser);
        return newUser;
    },
// The `updateUser` function allows updating a user's name and/or email by their ID.
    // If the user is not found, it returns null.
    updateUser: ({ id, name, email }: { id: string; name?: string; email?: string }) => {
        const user = users.find(user => user.id === id);
        if (!user) return null;
        if (name) user.name = name;
        if (email) user.email = email;
        return user;
    },
    // The `deleteUser` function removes a user by their ID and returns the deleted user.
    // If the user is not found, it returns null.
    deleteUser: ({ id }: { id: string }) => {
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) return null;
        const deletedUser = users[userIndex];
        users.splice(userIndex, 1);
        return deletedUser;
    }
};