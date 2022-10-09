import path from "path";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import xss from "xss";
import morgan from "morgan";
import dotenv from "dotenv";
import log from "utils/logger";
import connect from "utils/connect";
import routes from "routesMiddleware";
import Review from "models/review.model";
import User from "models/user.model";
import { omit } from "lodash";
import Phone from "models/phone.model";
import Laptop from "models/laptop.model";
import Product from "models/product.model";
import Booking from "models/booking.model";

dotenv.config();
const app = express();






app.use(helmet());

// limit requests from 1 IP
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP. try again in 1 hour",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use("/api", limiter);

// // body-parse,reading from body to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
// // Data sanitization against Nosql injection
app.use(mongoSanitize());
// // Data sanitization against XXS
const html = '<script>alert("xss");</script>';
// app.use(xss(html));

// Prevent parameter pollution

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// static file
// public not in src fixed it
app.use(express.static(path.join(__dirname, "../", "public")));
app.use(express.static(path.join(__dirname, "../../client",'build')));


// app.use(express.static(path.join()))

app.use(compression())
// const port = process.env.PORT || 3002;
// app.listen(port, () => {
//   debugger;
//   log.info(`App running at port ${port}`);

//   connect();
//   routes(app);

//   // (async () => {
//   //   const phones = await Products.find();
//   //   // @ts-ignore
//   //   phones.map(
//   //     (phone) =>
//   //       // @ts-ignore
//   //       (phone.ratingQuantity = 0)
//   //     // (phone.ratingAverage = 0)
//   //   );
//   //   phones.forEach(async (phone) => await phone.save());
//   //   // @ts-ignore
//   //   await Review.deleteMany();
//   //   await Booking.deleteMany();
//   //   await User.deleteMany();
//   //   console.log("DELETED");
//   // })();
//   // (async () => {
//   //   const phones = await Phone.find();
//   //   phones.forEach((phone) => (phone.prices = undefined));
//   //   phones.forEach(async (phone) => await phone.save());
//   // })();
//   // ??????Add to Products
//   // async () => {
//   //   const phones = await (
//   //     await Phone.find(
//   //       {},
//   //       {
//   //         title: 1,
//   //         ratingAverage: 1,
//   //         category: 1,
//   //         slug: 1,
//   //         price: 1,
//   //         imgCover: 1,
//   //         original: 1,
//   //         ratingQuantity: 1,
//   //         _id: 1,
//   //       }
//   //     )
//   //   ).map((phone) => {
//   //     phone.isNew = true;
//   //     return phone;
//   //   });

//   //   const laptops = await (
//   //     await Laptop.find(
//   //       {},
//   //       {
//   //         title: 1,
//   //         category: 1,
//   //         slug: 1,
//   //         price: 1,
//   //         imgCover: 1,
//   //         original: 1,

//   //         ratingAverage: 1,
//   //         ratingQuantity: 1,
//   //       }
//   //     )
//   //   ).map((laptop) => {
//   //     laptop.isNew = true;
//   //     return laptop;
//   //   });
//   //   console.log(phones);
//   //   // .map((phone) => (phone.isNew = true));
//   //   await Products.deleteMany();
//   //   const product = await Products.create([...phones, ...laptops]);
//   //   // @ts-ignore
//   //   // phones.map(
//   //   // (phone) =>
//   //   // @ts-ignore
//   //   // (phone.promote = undefined)
//   //   // );
//   //   // phones.forEach(async (phone) => await phone.save());
//   //   // @ts-ignore
//   //   // phones = await phones.save();
//   //   // await Review.deleteMany();

//   //   console.log("DELETED");
//   // };
//   // data img
//   // async () => {
//   //   const phones = await Laptop.find();
//   //   console.log(phones);
//   //   // @ts-ignore
//   //   phones.map(
//   //     (phone) =>
//   //       // @ts-ignore
//   //       (phone.configuration.special = "Có đèn bàn phím")
//   //     //   (phone.generalInformation = [
//   //     //     ` Mỗi lần ra mắt phiên bản mới là mỗi lần iPhone chiếm sóng trên khắp các
//   //     // mặt trận và lần này cái tên khiến vô số người "sục sôi" là iPhone 13
//   //     // Pro, chiếc điện thoại thông minh vẫn giữ nguyên thiết kế cao cấp, cụm 3
//   //     // camera được nâng cấp, cấu hình mạnh mẽ cùng thời lượng pin lớn ấn tượng.`,
//   //     //     `Thiết kế đặc trưng với màu sắc thời thượng`,
//   //     //     `iPhone 13 Pro không có nhiều sự thay đổi về thiết kế, khi máy vẫn sở hữu
//   //     //   kiểu dáng tương tự như điện thoại iPhone 12 Pro với các cạnh viền vuông
//   //     //   vắn và hai mặt kính cường lực cao cấp. Sở hữu 5 phiên bản màu gồm xanh
//   //     //   dương, bạc, vàng đồng, xám và xanh lá cho bạn tùy chọn theo sở thích của
//   //     //   mình`,
//   //     //   ])
//   //   );
//   //   // @ts-ignore
//   //   phones.forEach(async (phone) => await phone.save());
//   //   // phones = await phones.save();
//   //   // await Review.deleteMany();

//   //   console.log("DELETED");
//   // };
// });
export default app