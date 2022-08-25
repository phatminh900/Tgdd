import express from "express";
import {
  createPhoneHandler,
  getAllPhonesHandler,
  getPhoneHandler,
  deletePhoneHandler,
  updatePhoneHandler,
  getPhoneBySlugHandler,
  uploadPhoneImgs,
  resizingPhoneImg,
} from "controllers/phone.controller";
import { protect } from "middlewares/protect.middleware";
import restrictTo from "middlewares/restrictTo.middleware";

import reviewRouter from "routes/review.route";
import Phone from "models/phone/phone.model";
import mongoose from "mongoose";
import { isValidMongooseID } from "controllers/factory.controller";

const router = express.Router();

router.route("/").get(getAllPhonesHandler(Phone));
// router.param("id", isValidMongooseID);

// invalid id =>slug || valid id =>get by id
router.get("/:slug", getPhoneBySlugHandler(Phone));
router.get("/:id", getPhoneHandler(Phone));
// Phone/id/reviews

// Phone reviews
// add product name to distinguish reviews
router.use(
  "/:phoneId/reviews",
  (req, res, next) => {
    // @ts-ignore adding review or update to Phone model
    req.Phone = Phone;
    next();
  },
  reviewRouter
);
// need permission and specific role
router.use(protect, restrictTo("admin"));
router.post("/", createPhoneHandler(Phone));

// iphone store
router.post("/iphone", createPhoneHandler(Phone));
router
  .route("/:id")
  .patch(uploadPhoneImgs, resizingPhoneImg, updatePhoneHandler(Phone))
  .delete(deletePhoneHandler(Phone));

export default router;
