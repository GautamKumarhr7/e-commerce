import { Request, Response, NextFunction } from "express";
import { db } from "../../db/connection";
import { Users, deliveryAddress } from "../../db/schema";
import { eq } from "drizzle-orm";

const getAddress = async (req: Request, res: Response, next: NextFunction) => {
  const users = res.locals.users as typeof Users.$inferSelect;

  try {
    if (users.role !== "viewer") {
      return res.status(400).json({ message: "you are not authorized " });
    }
    const address = await db
      .select()
      .from(deliveryAddress)
      .where(eq(deliveryAddress.userId, users.id as number));
    return res
      .status(200)
      .json({ message: "address is get succesfully!", address });
  } catch (err) {
    next(err);
  }
};
