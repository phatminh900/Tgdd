import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "utils/AppError";

const restrictTo = (...roles: ("admin" | "user")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role as "admin" | "user"))
      return next(new ForbiddenError(`You don't have permission to do that.`));
    next();
  };
};
export default restrictTo;
