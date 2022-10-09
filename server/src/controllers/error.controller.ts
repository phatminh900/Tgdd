import dotenv from "dotenv";
import { Request, Response } from "express";
import { BadRequestError } from "utils/AppError";
dotenv.config();

const handleValidationError = (err: any) => {
  const errorMessage = Object.keys(err.errors).reduce(
    (errMsg, key) => err.errors[key].message + "," + errMsg,
    ""
  );

  return new BadRequestError(errorMessage);
};
const handleCastError = (err: any) => {
  const field = Object.keys(err)[0];
  return new BadRequestError(
    `Invalid ${err.errors[field]} (${err.errors[field].stringValue})`
  );
};
const handleDuplicateError = (err: any) => {
  const fields = Object.keys(err?.keyValue);

  let errMsg = fields.reduce((msg, field) => {
    if (!err.keyValue[field]) return msg;
    return msg + `${field} ${err.keyValue[field]}`;
  }, "");

  errMsg += "already exist.";
  return new BadRequestError(errMsg);
};
const handleJwtInvalidError = () => {
  return new BadRequestError(`Your token invalid please try again`);
};
const handleJwtExpiresError = () =>
  new BadRequestError(`Your token has expires please login again`);
const sendDevErr = (err: any, req: Request, res: Response) => {
  res.status(500).json({
    status: "fail",
    message: err.message,
    err,
    stack: err.stack,
  });
};
const sendProdErr = (err: any, req: Request, res: Response) => {
  // generic err cause by dev
  console.error('💥💥💥')
  if (!err.isOperationalError)
    return res.status(500).json({
      status: "fail",
      message: "Some thing went wrong try again later.",
    });
  const statusCode = err.statusCode || 500;
  const status = statusCode === 500 ? "error" : "fail";
  res.status(statusCode).json({
    status,
    message: err.message,
  });
};
export const errorController = (err: Error, req: Request, res: Response) => {
  if (process.env.NODE_ENV === "development") {
    // handleDuplicateError(err);
    sendDevErr(err, req, res);
  }
  if (process.env.NODE_ENV === "production") {
    let error = Object.create(err);
    if (error.code === 11000) error = handleDuplicateError(error);
    if (error.name === "CastError") error = handleCastError(error);
    if (error.name === "ValidationError") error = handleValidationError(err);
    if (error.name === "JsonWebTokenError") error = handleJwtInvalidError();
    if (error.name === "TokenExpiredError") error = handleJwtExpiresError();
    sendProdErr(error, req, res);
  }
};
