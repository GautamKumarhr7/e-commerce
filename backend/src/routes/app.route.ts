import { Router } from "express";
import singup from "../controllers/singup";
import login from "../controllers/login";

const router = Router();

router.post("/signup", singup);
router.post("/login", login);

export default router;
