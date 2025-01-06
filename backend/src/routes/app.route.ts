import { Router } from "express";
import singup from "../controllers/singup";
import login from "../controllers/login";
import authorization from "../middlewares/auth";


const router = Router();

router.post("/signup", singup);
router.post("/login", login);
router.use(authorization)
export default router;
