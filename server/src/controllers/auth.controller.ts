import User from "models/user.model";
import { NextFunction, Request, Response } from "express";
import catchAsync from "utils/catchAsync";
import { omit } from "lodash";
import { createOne } from "services/factory.service";
import { validatePassword } from "services/auth.service";
import { signJwt } from "utils/jwt";
export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { role, ...body } = req.body;
    const user = await createOne(User, body);
    res.status(201).json({
      status: "success",
      data: {
        ...omit(user.toJSON(), "password"),
      },
    });
  }
);
export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await validatePassword(req.body);
    const token = signJwt(user.id);
    res.cookie("jwtTgdd", token, { httpOnly: false });
    res.status(200).json({
      status: "success",
      data: {
        ...omit(user.toJSON(), "password", "passwordChangeAt"),
      },
      token,
    });
  }
);
