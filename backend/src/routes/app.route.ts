import { Router } from "express";
import singup from "../controllers/auth/singup";
import login from "../controllers/auth/login";
// import authorization from "../middlewares/auth";
import {
  addProducts,
  getProduct,
  addCatogries,
  getCatogries,
  addItemsToCart,
  getCartItems,
} from "../controllers";

const router = Router();

router.post("/signup", singup);
router.post("/login", login);
// router.use(authorization)
router.post("/addProducts", addProducts);
router.get("/getProduct/:id", getProduct);
router.post("/addCatogries", addCatogries);
router.get("/getCatogries/:id", getCatogries);
router.post("/addtocart", addItemsToCart);
router.get("/getCartItems", getCartItems);

export default router;
