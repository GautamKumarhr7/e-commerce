import { Request, Response, NextFunction } from "express";
import { Users, Products } from "../../db/schema";
import { db } from "../../db/connection";

const addProducts = async (req: Request, res: Response, next: NextFunction) => {
  const products = req.body as typeof Products.$inferSelect;
  const users = res.locals.users as typeof Users.$inferSelect;

  // if (users.role !== "admin" && users.role !== "editor") {
  //   return res.status(401).json({ message: "you are not admin " });
  // }
  try {
    const product = await db
      .insert(Products)
      .values({
        ...products,
        createdAt: new Date(),
        updateAt: new Date(),
      })
      .returning();
    return res
      .status(200)
      .json({ message: "product added successfully", product });
  } catch (err) {
    next(err);
  }
};
export default addProducts;
