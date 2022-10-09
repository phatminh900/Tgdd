import express from "express";
import {
  createBookingCheckout,
  getCheckoutSession,
  getUserBookings,
  getUserBooking,
} from "controllers/booking.controller";
import { protect } from "middlewares/protect.middleware";
const router = express.Router();

router.get("/", createBookingCheckout, (req, res, next) =>
  res.redirect("/")
);

router.get("/create-checkout-session/:productId", protect, getCheckoutSession);
router.post("/create-checkout-session/", protect, getCheckoutSession);
router.get("/my-booking", protect, getUserBookings);
router.get("/my-booking/:id", protect, getUserBooking);
export default router;
