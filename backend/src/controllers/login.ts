import { Request, Response, NextFunction } from "express";
import { db } from "../db/connection";
import { users } from "../db/schema";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

const login = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const data = await db.select().from(users).where(eq(users.email, email));

    if (!data[0]) {
      return res
        .status(404)
        .json({ error: "User not found. Please sign up first." });
    }
    const passwordVallidation = await bcrypt.compare(
      password,
      data[0].password
    );
    if (!passwordVallidation) {
      return res
        .status(400)
        .json({ message: "invalid password please check your password" });
    }

    const token = jwt.sign(
      { id: data[0].id, role: data[0].role, email: data[0].email },
      process.env.JWT_SECRET as string || " ",
      { expiresIn: "1h" }
    );
    return res
      .status(200)
      .header({ authorization: token })
      .json({
        message: "succesfully login",
        token,
        user: {
          id: data[0].id,
          name: data[0].name,
          email: data[0].email,
          role: data[0].role,
        },
      });
  } catch (error) {
    console.error("error during login", error);
    res.status(500).json({ error: "internal server error" });
  }
};
export default login;
