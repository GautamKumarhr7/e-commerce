import bcrypt from "bcrypt";
import { db } from "../db/connection";
import { users } from "../db/schema";
import { Request, Response } from "express";
import { timestamp } from "drizzle-orm/mysql-core";

const signup = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        await db.insert(users).values({
            name:name,
            email:email,
            password: hashedPassword,
            role:role,
            
        });

        // Successful response
        res.status(200).json({
            message: "User registered successfully!",
            user: { name, email, role }
        });
    } catch (error: any) {
        console.error("Error during signup:", error.message || error);

        // Error response
        if (error.code === "23505") {
            res.status(409).json({ error: "Email already registered" });
        } else {
            res.status(500).json({ error: "Internal server error during registration" });
        }
    }
};

export default signup;
