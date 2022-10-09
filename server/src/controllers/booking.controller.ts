import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import catchAsync from "utils/catchAsync";
import Booking from "models/booking.model";
import Product from "models/product.model";
import { NotFoundError } from "utils/AppError";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2022-08-01",
});

interface ICartDocument {
  id: string;
  price: number;
  currentColorImgCover: string;
  currentColor: string;
  quantity: number;
}
export const getCheckoutSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // get product (phone first)
    const { cart, discount, userAddress, userId } = req.body;
    // create checkout session

    // const bought product

    const products = cart.map((product: ICartDocument) => product.id);
    const prices = cart.map((product: ICartDocument) => product.price);
    const quantities = cart.map((product: ICartDocument) => product.quantity);
    const currentColors = cart.map((product: ICartDocument) =>
      encodeURI(product.currentColor)
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `/?products=${products.join(
        "&products="
      )}&quantities=${quantities.join("&quantities=")}&prices=${prices.join(
        "&prices="
      )}&userAddress=${encodeURI(
        userAddress
      )}&user=${userId}&colors=${currentColors.join("&colors=")}`,
      mode: "payment",
      cancel_url: `/cart`,
      customer_email: req.user.email,
      client_reference_id: req.params.productId,
      //
      line_items: cart.map((item: any) => ({
        price_data: {
          currency: "vnd",
          product_data: { name: item.title, images: [item.imgCover] },
          unit_amount: item.price - (item.price * discount) / 100,
        },
        quantity: item.quantity,
      })),
    });

    res.status(200).json({
      status: "success",
      session,
    });
  }
);
export const createBookingCheckout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { products, prices, colors, userAddress, user, quantities } =
      req.query;
    // product can either arr or single
    if (
      !products ||
      (!products.length && !prices) ||
      (!prices?.length && !userAddress && !user)
    )
      return next();
    await Booking.create({
      products,
      colors,
      prices,
      userAddress,
      user,
      quantities,
    });
    next();
  }
);
export const getUserBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // find user
    const bookings = await Booking.find({ user: req.user.id });
    // O(n2)
    const userBookings = bookings.map((booking) => ({
      products: booking.products.map((product, i) => ({
        title: product.title,
        imgCover: product.imgCover,
        quantity: booking.quantities[i],
        currentColor: booking.colors[i],
      })),
      _id: booking._id,
      total: booking.prices.reduce((total, price) => total + price, 0),
      userAddress: booking.userAddress,
      createdAt: booking.createdAt,
    }));

    // const prices=
    res.status(200).json({
      status: "success",
      data: userBookings,
    });

    // const productsIds=userBooking.ma
    // const { product, price, color, userAddress, user } = req.query;
    // // product can either arr or single
    // if (
    //   !product ||
    //   (!product.length && !price) ||
    //   (!price?.length && !userAddress && !user)
    // )
    //   return next();
    // await Booking.create({ product, color, price, userAddress, user });
    // next();
  }
);
export const getUserBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // find user
    const booking = await Booking.findOne({
      user: req.user.id,
      _id: req.params.id,
    });
    if (!booking) return next(new NotFoundError("Cant find this booking"));
    const userBooking = {
      products: booking.products.map((product, i) => ({
        title: product.title,
        imgCover: product.imgCover,
        quantity: booking.quantities[i],
        currentColor: booking.colors[i],
        price: product.price,
        slug: product.slug,
        category: product.category,
      })),
      _id: booking._id,
      total: booking.prices.reduce((total, price) => total + price, 0),
      userAddress: booking.userAddress,
      createdAt: booking.createdAt,
    };

    // const prices=
    res.status(200).json({
      status: "success",
      data: userBooking,
    });

    // const productsIds=userBooking.ma
    // const { product, price, color, userAddress, user } = req.query;
    // // product can either arr or single
    // if (
    //   !product ||
    //   (!product.length && !price) ||
    //   (!price?.length && !userAddress && !user)
    // )
    //   return next();
    // await Booking.create({ product, color, price, userAddress, user });
    // next();
  }
);
