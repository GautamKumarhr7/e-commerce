import { Express, Request, Response, NextFunction } from "express";
import { db } from "../../db/connection";
import { Users, addToCart } from "../../db/schema";
import { eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";

export const getCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = res.locals.users as typeof Users.$inferSelect;
  try {
    if (users.role !== "viewer") {
      throw new Error("you are not authorized to view cart");
    }
    const cart = await db
      .select()
      .from(addToCart)
      .where(eq(addToCart.userId, users.id as number));
    if (!cart.length) {
      throw new Error("your cart is not found");
    }
    return res.status(StatusCodes.OK).json({
      messsage: "succesfully retrived your cart",
      cart,
    });
  } catch (err) {
    next(err);
  }
};
export default getCartItems;
