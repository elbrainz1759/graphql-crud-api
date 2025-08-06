import { schoolAdmin } from "../interfaces/interface";
import { v4 as uuidv4 } from "uuid";

export const schoolAdminResolvers = {
    Query: {
        getSchoolAdmin: async ({ id }: { id: string }, context: any): Promise<schoolAdmin | undefined> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("School Admin ID is required.");
            }
            // Find and return the school admin by ID
            const [rows] = await context.db.query("SELECT * FROM schoolAdmins WHERE id = ?", [id]);
            if (rows.length === 0) {
                throw new Error(`School Admin with ID ${id} does not exist.`);
            }
            return rows[0];
        },
        getSchoolAdmins: async (context: any): Promise<schoolAdmin[]> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            const [rows] = await context.db.query("SELECT * FROM schoolAdmins");
            if (rows.length === 0) {
                throw new Error("No school admins found.");
            }
            return rows;
        },
    },
    Mutation: {
        createSchoolAdmin: async ({ name, email, schoolId }: Omit<schoolAdmin, "id" | "createdAt" | "createdBy">, context: any): Promise<schoolAdmin> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!name || !email || !schoolId) {
                throw new Error("Name, email, and schoolId are required to create a school admin.");
            }
            // Check if the school admin already exists
            const [existingAdmins] = await context.db.query("SELECT * FROM schoolAdmins WHERE email = ? AND schoolId = ?", [email, schoolId]);
            if (existingAdmins.length > 0) {
                throw new Error(`School Admin with email "${email}" already exists in school with ID ${schoolId}.`);
            }
            // Create a new school admin object
            const newSchoolAdmin: schoolAdmin = {
                id: uuidv4(),
                name,
                email,
                schoolId,
                createdAt: new Date().toISOString(),
                createdBy: context.user.id
            };
            // Insert the new school admin into the database
            await context.db.query("INSERT INTO schoolAdmins (id, name, email, schoolId, createdAt, createdBy) VALUES (?, ?, ?, ?, ?, ?)", [
                newSchoolAdmin.id,
                newSchoolAdmin.name,
                newSchoolAdmin.email,
                newSchoolAdmin.schoolId,
                newSchoolAdmin.createdAt,
                newSchoolAdmin.createdBy
            ]);
            return newSchoolAdmin;
        },
        updateSchoolAdmin: async ({ id, name, email, schoolId }: Partial<schoolAdmin> & { id: string }, context: any): Promise<schoolAdmin | null> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("School Admin ID is required.");    
            }
            // Find the school admin by ID
            const [rows] = await context.db.query("SELECT * FROM schoolAdmins WHERE id = ?", [id]);
            if (rows.length === 0) {
                throw new Error(`School Admin with ID ${id} does not exist.`);
            }
            const schoolAdminToUpdate = rows[0];
            // Update the school admin fields if provided
            if (name) schoolAdminToUpdate.name = name;
            if (email) schoolAdminToUpdate.email = email;
            if (schoolId) schoolAdminToUpdate.schoolId = schoolId;
            // Update the school admin in the database
            await context.db.query("UPDATE schoolAdmins SET name = ?, email = ?, schoolId = ? WHERE id = ?", [
                schoolAdminToUpdate.name,
                schoolAdminToUpdate.email,
                schoolAdminToUpdate.schoolId,
                id
            ]);
            return schoolAdminToUpdate;
        },
        deleteSchoolAdmin: async ({ id }: { id: string }, context: any): Promise<schoolAdmin | null> => {
            if (!context.user) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (!id) {
                throw new Error("School Admin ID is required.");
            }
            // Find the school admin by ID
            const [rows] = await context.db.query("SELECT * FROM schoolAdmins WHERE id = ?", [id]);
            if (rows.length === 0) {
                throw new Error(`School Admin with ID ${id} does not exist.`);
            }
            const schoolAdminToDelete = rows[0];
            // Delete the school admin from the database
            await context.db.query("DELETE FROM schoolAdmins WHERE id = ?", [id]);
            return schoolAdminToDelete;
        }
    }
};

export default schoolAdminResolvers;
