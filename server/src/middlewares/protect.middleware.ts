import { NextFunction, Request, Response } from "express";
import User from "models/user.model";
import { findOne } from "services/factory.service";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "utils/AppError";
import catchAsync from "utils/catchAsync";
import { verifyJwt } from "utils/jwt";

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // jwt exist
    let token: string | undefined;
    const requestHeaderAuth = req.headers.authorization;
    if (requestHeaderAuth && requestHeaderAuth.startsWith("Bearer")) {
      token = requestHeaderAuth.split(" ")[1];
    }
    if (!token)
      return next(
        new UnAuthorizedError(`You're not login.Please login and try again.`)
      );
    // valid jwt
    // @ts-ignore
    const decoded: { id: string; iat: number; exp: number } = await verifyJwt(
      token
    );
    // find user still exist
    const user = await findOne(User, decoded.id);
    if (!user)
      return next(
        new NotFoundError(`User belongs to this token no longer exist.`)
      );
    // user change password after token was issued
    if (
      user.passwordChangeAt &&
      user.isPasswordChangeAfterIssued(decoded.iat)
    ) {
      return next(
        new BadRequestError(`User recently change password.Please login again`)
      );
    }
    // assign user to the next middleware

    req.user = user;
    next();
  }
);
