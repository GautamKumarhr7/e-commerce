import { db } from "../../db/connection";
import { Products, Users } from "../../db/schema";
import { Request, Response, NextFunction } from "express";
import { eq } from "drizzle-orm";

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const users = res.locals.users as typeof Users.$inferSelect;
  const productId = +req.params.id;
  if (!productId) {
    return res.status(400).json({ message: "product id is required" });
  }
  try {
    const product = await db
      .select()
      .from(Products)
      .where(eq(Products.id, productId));
    return res
      .status(200)
      .json({ message: "product added successfully", product });
  } catch (err) {
    next(err);
  }
};
export default getProduct;
