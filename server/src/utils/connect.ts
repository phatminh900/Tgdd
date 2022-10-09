import mongoose from "mongoose";
import dotenv from "dotenv";
import log from "./logger";
import routes from "routesMiddleware";

dotenv.config();
const uri = process.env.DATABASE!;

// console.log(uri);
const connect = () => {
  mongoose
    .connect(uri)
    .then(() => {
      log.info("Connected to DB");
    })
    .catch((err) => {
      log.error(err);
      log.error("fail to connect to DB");
    });
};
export default connect;
