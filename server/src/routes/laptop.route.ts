import express from "express";
import {
  createProductHandler,
  getAllProductsHandler,
  getProductHandler,
  deleteProductHandler,
  updateProductHandler,
  getProductBySlugHandler,
  uploadProductImgs,
  resizingProductImg,
} from "controllers/product.controller";
import { protect } from "middlewares/protect.middleware";
import restrictTo from "middlewares/restrictTo.middleware";

import reviewRouter from "routes/review.route";
import Phone from "models/phone.model";
import mongoose from "mongoose";
import Laptop from "models/laptop.model";

const router = express.Router();

router.route("/").get(getAllProductsHandler(Laptop));
// router.param("id", isValidMongooseID);

// invalid id =>slug || valid id =>get by id
router.get("/:slug", getProductBySlugHandler(Laptop));
router.get("/:id", getProductHandler(Laptop));
// Laptop/id/reviews

// Laptop reviews
// add product name to distinguish reviews
router.use(
  "/:laptopId/reviews",
  (req, res, next) => {
    // @ts-ignore adding review or update to Laptop model
    req.Product = Laptop;
    next();
  },
  reviewRouter
);
// need permission and specific role
router.use(protect, restrictTo("admin"));
router.post("/", createProductHandler(Laptop));
// router.patch("/:id", updateProductHandler(Laptop));
// iProduct store
router.post("/", createProductHandler(Laptop));
router
  .route("/:id")
  .patch(
    uploadProductImgs,
    resizingProductImg("laptops"),
    updateProductHandler(Laptop)
  )
  .delete(deleteProductHandler(Laptop));

export default router;
