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

const router = express.Router();

router.route("/").get(getAllProductsHandler(Phone));
// router.param("id", isValidMongooseID);

// invalid id =>slug || valid id =>get by id
router.get("/:slug", getProductBySlugHandler(Phone));
router.get("/:id", getProductHandler(Phone));
// Phone/id/reviews

// Phone reviews
// add product name to distinguish reviews
router.use(
  "/:phoneId/reviews",
  (req, res, next) => {
    // @ts-ignore adding review or update to Phone model (ADD MODEL)
    req.Product = Phone;
    next();
  },
  reviewRouter
);
// need permission and specific role
router.use(protect, restrictTo("admin"));
router.post("/", createProductHandler(Phone));

// iphone store
router.post("/iphone", createProductHandler(Phone));
router
  .route("/:id")
  .patch(
    uploadProductImgs,
    resizingProductImg("phones"),
    updateProductHandler(Phone)
  )
  .delete(deleteProductHandler(Phone));

export default router;
