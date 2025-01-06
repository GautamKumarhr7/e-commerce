import { Request, Response, NextFunction } from "express";
import { users } from "../db/schema";
import { db } from "../db/connection";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("authorization");
  if (!token) {
    return res.status(400).json({ message: "access deneid! token is missing" });
  }

  try {
    const tokenValidation = jwt.verify(
      token,
      (process.env.JWT_SECRET as string) || "haker "
    ) as typeof users.$inferSelect;
    if (!tokenValidation) {
      return res.status(404).json({ message: "acces denaid, invalid token!" });
    }
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, tokenValidation.id));
    if (!user.length) {
      return res.status(404).json({ message: "not a valid user token" });
    }
    const refreshToken = jwt.sign(
      { ...user[0] },
      (process.env.JWT_SECRET as string) || "haker ",
      { expiresIn: "24*60*60" }
    );
    return res.setHeader("authorization", refreshToken);
    next();
  } catch (error) {
    next(error)
    return res.status(500).json({ error: "internal server problem" });
  }
};
export default authorization;
