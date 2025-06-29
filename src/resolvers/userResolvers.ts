import { User } from "../interfaces/interface"
import { v4 as uuidv4 } from "uuid";
import sampleData from "../../db";

let users: User[] = sampleData.users || [];

export const userResolvers = {
    Query: {
        getUser: ({ id }: { id: string }) => {
            return users.find(user => user.id === id);
        },
        getUsers: () => {
            return users;
        },
    },
    Mutation: {
        createUser: ({ name, email }: { name: string; email: string }) => {
            const newUser: User = {
                id: uuidv4(),
                name,
                email,
                createdAt: new Date().toISOString(),
                createdBy: "system" // This can be modified to include the actual creator's ID
            };
            users.push(newUser);
            return newUser;
        },
        updateUser: ({ id, name, email }: { id: string; name?: string; email?: string }) => {
            const user = users.find(user => user.id === id);
            if (!user) return null;
            if (name) user.name = name;
            if (email) user.email = email;
            return user;
        },
        deleteUser: ({ id }: { id: string }) => {
            const userIndex = users.findIndex(user => user.id === id);
            if (userIndex === -1) return null;
            const deletedUser = users[userIndex];
            users.splice(userIndex, 1);
            return deletedUser;
        }
    }
};