import { Request, Response, NextFunction } from "express";
import { db } from "../../db/connection";
import { Users, deliveryAddress } from "../../db/schema";

const addaddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = res.locals.users as typeof Users.$inferSelect;

    if (users.role !== "viewer") {
      return res
        .status(403)
        .json({ message: "You are not authorized to add an address" });
    }

    const address = await db
      .insert(deliveryAddress)
      .values({
        userId: users.id as number,
        name:req.body.name as string,
        address: req.body.address as string,
        city: req.body.city as string ,
        state: req.body.state as string,
        postalCode: req.body.pincode as number,
        country: req.body.country as string,
        phoneNumber: req.body.phone as number, 
        active: req.body.active ?? true,
        createdAt: new Date()
      })
      .returning();

    res.status(201).json({ message: "Address added successfully", address });
  } catch (error) {
    next(error);
  }
};

export default addaddress;
