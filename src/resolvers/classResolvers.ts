import { Class } from "../interfaces/interface";
import { v4 as uuidv4 } from "uuid";

export const classResolvers = {
    Query: {
        getClass: async ({ id }: { id: string }, context: any): Promise<Class | undefined> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("Class ID is required.");
            }
            // Find and return the class by ID
            const [rows] = await context.db.query("SELECT * FROM classes WHERE id = ?", [id]);
            if (rows.length === 0) {
                throw new Error(`Class with ID ${id} does not exist.`);
            }
            return rows[0];
        },
        getClasses: async (context: any): Promise<Class[]> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            const [rows] = await context.db.query("SELECT * FROM classes");
            if (rows.length === 0) {
                throw new Error("No classes found.");
            }
            return rows;
        },
    },
    Mutation: {
        createClass: async ({ name, schoolId }: Omit<Class, "id">, context: any): Promise<Class> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!name || !schoolId) {
                throw new Error("Name and schoolId are required to create a class.");
            }
            // Check if the class already exists
            const [existingClasses] = await context.db.query("SELECT * FROM classes WHERE name = ? AND schoolId = ?", [name, schoolId]);
            if (existingClasses.length > 0) {
                throw new Error(`Class with name "${name}" already exists in school with ID ${schoolId}.`);
            }
            // Create a new class object
            const newClass: Class = {
                id: uuidv4(),
                name,
                schoolId,
                createdAt: new Date(),
                createdBy: context.user.id
            };
            // Insert the new class into the database
            await context.db.query("INSERT INTO classes (id, name, schoolId, createdAt, createdBy) VALUES (?, ?, ?, ?, ?)", [
                newClass.id,
                newClass.name,
                newClass.schoolId,
                newClass.createdAt,
                newClass.createdBy
            ]);
            return newClass;
        },
        updateClass: async ({ id, name, schoolId }: Partial<Class> & { id: string }, context: any): Promise<Class | null> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("Class ID is required.");
            }
            // Check if the class exists
            const [existingClasses] = await context.db.query("SELECT * FROM classes WHERE id = ?", [id]);
            if (existingClasses.length === 0) {
                throw new Error(`Class with ID ${id} does not exist.`);
            }
            // Update the class
            const updatedClass: Class = {
                ...existingClasses[0],
                name: name || existingClasses[0].name,
                schoolId: schoolId || existingClasses[0].schoolId,
                updatedAt: new Date(),
                updatedBy: context.user.id
            };
            await context.db.query("UPDATE classes SET name = ?, schoolId = ? WHERE id = ?", [
                updatedClass.name,
                updatedClass.schoolId,
                id
            ]);
            return updatedClass;
        },
        deleteClass: async ({ id }: { id: string }, context: any): Promise<boolean> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("Class ID is required.");
            }
            // Check if the class exists
            const [existingClasses] = await context.db.query("SELECT * FROM classes WHERE id = ?", [id]);
            if (existingClasses.length === 0) {
                throw new Error(`Class with ID ${id} does not exist.`);
            }
            // Delete the class
            await context.db.query("DELETE FROM classes WHERE id = ?", [id]);
            return true;
        },
    },
};
