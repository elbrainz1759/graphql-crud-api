import { studentsType } from "../types/studentsType";
import { v4 as uuidv4 } from "uuid";
import { Student } from "../interfaces/interface";

//Resolver for student

export const studentResolvers = {
    Query: {
        getStudent: async ({ id }: { id: string }, context: any): Promise<Student | undefined> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("Student ID is required.");
            }
            // Find and return the student by ID
            const [rows] = await context.db.query("SELECT * FROM students WHERE id = ?", [id]);
            if (rows.length === 0) {
                throw new Error(`Student with ID ${id} does not exist.`);
            }
            return rows[0];
        },
        getStudents: async (context: any): Promise<Student[]> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            const [rows] = await context.db.query("SELECT * FROM students");
            if (rows.length === 0) {
                throw new Error("No students found.");
            }
            return rows;
        },
    },
    Mutation: {
        createStudent: async ({ name, email, schoolId }: Omit<Student, "id">, context: any): Promise<Student> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!name || !email || !schoolId) {
                throw new Error("Name, email, and schoolId are required to create a student.");
            }
            // Check if the student already exists
            const [existingStudents] = await context.db.query("SELECT * FROM students WHERE name = ? AND email = ?", [name, email]);
            if (existingStudents.length > 0) {
                throw new Error(`Student with name "${name}" already exists in school with ID ${schoolId}.`);
            }

            // Create the student
            const newStudent: Student = {
                id: uuidv4(),
                name,
                email,
                schoolId,
                createdAt: new Date().toISOString(),
                createdBy: context.user.id, // Assuming context.user contains the logged-in user's ID
            };
            await context.db.query("INSERT INTO students SET ?", [newStudent]);
            return newStudent;
        },
        updateStudent: async ({ id, name, email, schoolId }: Partial<Student> & { id: string }, context: any): Promise<Student | null> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("Student ID is required.");
            }
            // Check if the student exists
            const [existingStudents] = await context.db.query("SELECT * FROM students WHERE id = ?", [id]);
            if (existingStudents.length === 0) {
                throw new Error(`Student with ID ${id} does not exist.`);
            }

            // Update the student
            const updatedStudent: Student = {
                ...existingStudents[0],
                name: name || existingStudents[0].name,
                email: email || existingStudents[0].email,
                schoolId: schoolId || existingStudents[0].schoolId,
                updatedAt: new Date().toISOString(),
                updatedBy: context.user.id, // Assuming context.user contains the logged-in user's ID
            };
            await context.db.query("UPDATE students SET ? WHERE id = ?", [updatedStudent, id]);
            return updatedStudent;
        },
        deleteStudent: async ({ id }: { id: string }, context: any): Promise<boolean> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("Student ID is required.");
            }
            // Check if the student exists
            const [existingStudents] = await context.db.query("SELECT * FROM students WHERE id = ?", [id]);
            if (existingStudents.length === 0) {
                throw new Error(`Student with ID ${id} does not exist.`);
            }

            // Delete the student
            await context.db.query("DELETE FROM students WHERE id = ?", [id]);
            return true;
        },
    },
};