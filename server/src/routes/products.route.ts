import express from "express";
import {
  createProductHandler,
  getAllProductsHandler,
  deleteProductHandler,
} from "controllers/product.controller";
import { protect } from "middlewares/protect.middleware";

import Product from "models/product.model";

const router = express.Router();

router.get("/", getAllProductsHandler(Product));
router.get("/search", async (req, res, next) => {
  const products = await Product.find({
    title: {
      $regex: new RegExp(
        // @ts-ignore
        "^" + req.query.search ? req.query.search.slice(1, -1) : "" + ".*",
        "i"
      ),
    },
  })
    .sort("price")
    .limit(5);
  res.status(200).json({
    status: "success",
    results: products.length,
    products,
  });
});
router.post("/", protect, createProductHandler(Product));
router.delete("/:id", deleteProductHandler(Product));

export default router;
