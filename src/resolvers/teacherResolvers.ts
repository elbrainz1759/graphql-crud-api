import { teacherType } from "../types/teacherType";
import { v4 as uuidv4 } from "uuid";
import { Teacher } from "../interfaces/interface";

export const teacherResolvers = {
    Query: {
        getTeacher: async ({ id }: { id: string }, context: any): Promise<Teacher | undefined> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("Teacher ID is required.");
            }
            const [rows] = await context.db.query("SELECT * FROM teachers WHERE id = ?", [id]);
            if (rows.length === 0) {
                throw new Error(`Teacher with ID ${id} does not exist.`);
            }
            return rows[0];
        },
        getTeachers: async (context: any): Promise<Teacher[]> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            const [rows] = await context.db.query("SELECT * FROM teachers");
            return rows;
        },
        getTeachersBySchool: async ({ schoolId }: { schoolId: string }, context: any): Promise<Teacher[]> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!schoolId) {
                throw new Error("School ID is required.");
            }
            const [rows] = await context.db.query("SELECT * FROM teachers WHERE schoolId = ?", [schoolId]);
            return rows;
        },
        getTeachersByCreatedBy: async ({ createdBy }: { createdBy: string }, context: any): Promise<Teacher[]> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!createdBy) {
                throw new Error("Created By field is required.");
            }
            const [rows] = await context.db.query("SELECT * FROM teachers WHERE createdBy = ?", [createdBy]);
            return rows;
        },
    },
    Mutation: {
        createTeacher: async ({ name, email, schoolId, createdBy }: Omit<Teacher, "id" | "createdAt">, context: any): Promise<Teacher> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!name || !email || !schoolId || !createdBy) {
                throw new Error("All fields (name, email, schoolId, createdBy) are required to create a teacher.");
            }

            // Check if the teacher already exists
            const [existingTeachers] = await context.db.query("SELECT * FROM teachers WHERE email = ?", [email]);
            if (existingTeachers.length > 0) {
                throw new Error(`Teacher with email "${email}" already exists.`);
            }
            const newTeacher: Teacher = {
                id: uuidv4(),
                name,
                email,
                schoolId,
                createdAt: new Date().toISOString(),
                createdBy,
            };
            await context.db.query("INSERT INTO teachers SET ?", [newTeacher]);
            return newTeacher;
        },
        updateTeacher: async ({ id, name, email, schoolId }: Partial<Teacher> & { id: string }, context: any): Promise<Teacher | null> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("Teacher ID is required.");
            }

            // Check if the teacher exists
            const [existingTeachers] = await context.db.query("SELECT * FROM teachers WHERE id = ?", [id]);
            if (existingTeachers.length === 0) {
                throw new Error(`Teacher with ID ${id} does not exist.`);
            }

            const updatedTeacher: Partial<Teacher> = { id };
            if (name) updatedTeacher.name = name;
            if (email) updatedTeacher.email = email;
            if (schoolId) updatedTeacher.schoolId = schoolId;

            await context.db.query("UPDATE teachers SET ? WHERE id = ?", [updatedTeacher, id]);
            return { ...existingTeachers[0], ...updatedTeacher };
        },
        deleteTeacher: async ({ id }: { id: string }, context: any): Promise<boolean> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("Teacher ID is required.");
            }
            // Check if the teacher exists
            const [existingTeachers] = await context.db.query("SELECT * FROM teachers WHERE id = ?", [id]);
            if (existingTeachers.length === 0) {
                throw new Error(`Teacher with ID ${id} does not exist.`);
            }
            await context.db.query("DELETE FROM teachers WHERE id = ?", [id]);
            return true;
        },
    },
}

   