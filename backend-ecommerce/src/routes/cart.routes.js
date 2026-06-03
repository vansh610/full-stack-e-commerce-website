import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { addToCart,getCart } from "../controllers/cart.controller.js";

const router = Router();

router.post("/add",verifyJWT, addToCart);
router.get("/",verifyJWT,getCart);

export default router;