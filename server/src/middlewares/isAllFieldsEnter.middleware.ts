import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "utils/AppError";

const isAllFieldsEnter = (...fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!fields.every((field) => req.body[field]?.length > 0)) {
      return next(new BadRequestError(`Please fill out all the fields.`));
    }
    next();
  };
};

export default isAllFieldsEnter;
