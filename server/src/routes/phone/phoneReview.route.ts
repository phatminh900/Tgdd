import express from "express";
import {
  createReviewHandler,
  getAllReviewsHandler,
  getReviewHandler,
  deleteReviewHandler,
  updateReviewHandler,
  setUserId,
  setProductId,
} from "controllers/review.controller";
import { protect } from "middlewares/protect.middleware";
import restrictTo from "middlewares/restrictTo.middleware";
const router = express.Router({ mergeParams: true });

// /:productID/reviews

router.route("/").get(setProductId, getAllReviewsHandler);

router.get("/:id", getReviewHandler);
// Review/id/reviews
router.use(protect);
router.route("/:id").patch(updateReviewHandler).delete(deleteReviewHandler);
// productId/reviews
router.post("/", setProductId, setUserId, createReviewHandler);
router.patch("/:reviewId", updateReviewHandler);
// router.post("/:id/reviews", setProductIdAndUserId, createReviewHandler);

// need permission and specific role

// specify for admin
router.use(protect, restrictTo("admin"));
router.post("/", createReviewHandler);
router.route("/:id").patch(updateReviewHandler).delete(deleteReviewHandler);

export default router;
