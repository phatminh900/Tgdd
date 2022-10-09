import dotenv from "dotenv";
import app from "./src/app";
import log from "./src/utils/logger";
import connect from "./src/utils/connect";
import routes from "./src/routesMiddleware";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
const port = process.env.PORT || 3002;
const server = app.listen(port, () => {
  log.info(`App running at port ${port}`);

  connect();
  routes(app);
});
process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
