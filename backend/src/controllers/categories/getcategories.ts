import { Category,Users } from "../../db/schema";
import { db } from "../../db/connection";
import { Request, Response, NextFunction } from "express";
import { eq } from "drizzle-orm";

const getCatogries=async(req: Request, res: Response, next: NextFunction)=>{
    const users=res.locals.users as typeof Users.$inferSelect;
    const categoryId=+req.params.id;
    if(!categoryId){
        return res.status(400).json({message:"category id is required"});
    }
    try{
        const category=await db.select().from(Category).where(eq(Category.id,categoryId));
        return res.status(200).json({message:"category deleted successfully",category});
    }catch(err){
        next(err);
    }
}
export default getCatogries;