import { Express,Request,Response,NextFunction } from "express";
import { db } from "../../db/connection";
import { Users,addToCart,Products } from "../../db/schema";
import { StatusCodes } from "http-status-codes";
import { eq } from "drizzle-orm";

const addItemsToCart=async(req:Request,res:Response,next:NextFunction)=>{
    const users=res.locals.user as typeof Users.$inferSelect;
    const productId=+req.body.prodeuctId;
    const quentity=+req.body.quantity
    try{
        if(users.role!=="viewer"){
            throw new Error("You are not authorized to add items to cart");
        }
        const productDetials=await db.select().from(Products).where(eq(Products.id,productId)).execute();
        if(!productDetials.length){
            throw new Error("Product not found");
        }
        const totalProductPrice=productDetials[0].price*quentity;
        const cart=await db.insert(addToCart).values({
            userId:users.id,
            productId:productId,
            quantity:quentity,
            totalPrice:totalProductPrice,
            createdAt:new Date()
        })
        .returning().execute();
        return res.status(StatusCodes.OK).json({message:"Product added to cart successfully",cart});



    }catch(err){
        next(err);
    }
}
export default addItemsToCart;
