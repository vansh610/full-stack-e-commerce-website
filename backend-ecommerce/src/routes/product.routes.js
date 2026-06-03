import { Router } from "express";

import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";

const router = Router();


// TEST ROUTE
router.get("/test", (req, res) => {
  res.send("Product route working");
});


// ADD PRODUCT
router.post("/add", addProduct);


// GET ALL PRODUCTS
router.get("/", getAllProducts);


// GET SINGLE PRODUCT
router.get("/:id", getSingleProduct);


// UPDATE PRODUCT
router.put("/:id", updateProduct);


// DELETE PRODUCT
router.delete("/:id", deleteProduct);

export default router;