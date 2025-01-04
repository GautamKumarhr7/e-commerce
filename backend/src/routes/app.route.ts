
import { Router } from "express";
import singup from "../controllers/singup";

const router=Router();

router.post("/signup",singup);



export default router;
