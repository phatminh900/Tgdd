import path from "path";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import log from "utils/logger";
import connect from "utils/connect";
import routes from "routesMiddleware";
import Review from "models/review.model";
import User from "models/user.model";

import Phone from "models/phone/phone.model";

dotenv.config();
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

// static file
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3002;
app.listen(port, () => {
  log.info(`App running at port ${port}`);

  connect();
  routes(app);
  // (async () => {
  //   const phones = await Phone.find();
  //   // @ts-ignore
  //   phones.map(
  //     (phone) =>
  //       // @ts-ignore
  //       (phone.images = undefined)
  //   );
  //   phones.forEach(async (phone) => await phone.save());
  //   // @ts-ignore
  //   // phones = await phones.save();
  //   // await Review.deleteMany();

  //   console.log("DELETED");
  // })();
  // data img
  // (async () => {
  //   const phones = await Phone.find({
  //     $and: [
  //       { id: "62f5b95ac0d5d377f467d210" },
  //       { id: "62f5b992c0d5d377f467d215" },
  //     ],
  //   });
  //   // @ts-ignore
  //   phones.map(
  //     (phone) =>
  //       // @ts-ignore
  //       (phone.imgs = {
  //         imgHighlights: [
  //           "/img/phones/phone-62f5b992c0d5d377f467d215-1661332132504-1.jpg",
  //           "/img/phones/phone-62f5b992c0d5d377f467d215-1661332132506-4.jpg",
  //           "/img/phones/phone-62f5b992c0d5d377f467d215-1661332132507-5.jpg",
  //           "/img/phones/phone-62f5b992c0d5d377f467d215-1661332132507-6.jpg",
  //           "/img/phones/phone-62f5b992c0d5d377f467d215-1661332132507-7.jpg",
  //         ],
  //         imgConfiguration: [
  //           "/img/phones/phone-62f5b992c0d5d377f467d215-1661332132505-2.jpg",
  //         ],
  //         imgGeneralInformation: [
  //           "/img/phones/phone-62f5b992c0d5d377f467d215-1661332132507-8.jpg",
  //         ],
  //         "Vàng Đồng": [
  //           "/img/phones/phone-62f5b992c0d5d377f467d215-1661332132508-9.jpg",
  //           "/img/phones/phone-62f5b992c0d5d377f467d215-1661332132508-10.jpg",
  //           "/img/phones/phone-62f5b992c0d5d377f467d215-1661332132508-11.jpg",
  //           "/img/phones/phone-62f5b992c0d5d377f467d215-1661332132508-12.jpg",
  //           "/img/phones/phone-62f5b992c0d5d377f467d215-1661332132508-13.jpg",
  //         ],
  //         "Xanh Dương": [
  //           "/img/phones/phone-62f5b992c0d5d377f467d215-1661332132508-14.jpg",
  //           "/img/phones/phone-62f5b992c0d5d377f467d215-1661332132508-15.jpg",
  //           "/img/phones/phone-62f5b992c0d5d377f467d215-1661332132508-16.jpg",
  //         ],
  //       })
  //   );
  //   // @ts-ignore
  //   phones.forEach(async (phone) => await phone.save());
  //   // phones = await phones.save();
  //   // await Review.deleteMany();

  //   console.log("DELETED");
  // })();
});
