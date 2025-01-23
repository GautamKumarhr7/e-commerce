import { Category,Users } from "../../db/schema";
import { db } from "../../db/connection";
import { Request, Response, NextFunction } from "express";

const addCatogries=async(req: Request, res: Response, next: NextFunction)=>{
    const users=res.locals.users as typeof Users.$inferSelect;
    const category=req.body.category as typeof Category.$inferSelect;
    if(users.role !== "admin" && users.role !== "editor"){
        return res.status(401).json({message:"you are not admin"});
    }
    try{
        const categories=await db.insert(Category).values({
            ...category,
            created_at:new Date(),
            updated_at:new Date(),
        }).returning();
        return res.status(200).json({message:"category added successfully",categories});
    }catch(err){
        next(err);
    }
}
export default addCatogries;