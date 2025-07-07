// src/resolvers/authResolvers.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authResolvers = {
    Mutation: {
        login: async (
            _: any,
            { email, password }: { email: string; password: string }, context: any
        ) => {
            const [user] = await context.db.query("SELECT * FROM users WHERE email = ?", [email]);
            if (!user) throw new Error("Invalid credentials");

            // Check if the password matches
            if (!user.password) {
                console.log("User does not have a password set");
                return null;
            }
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw new Error("Invalid credentials");

            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role, countryId: user.countryId },
                process.env.JWT_SECRET || "secret",
                { expiresIn: "1d" }
            );

            return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role, countryId: user.countryId } };
        },
    },
};
