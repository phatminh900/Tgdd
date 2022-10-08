import User from "models/user.model";
import { NextFunction, Request, Response } from "express";
import catchAsync from "utils/catchAsync";

export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    // only can update name
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ status: "success", data: user });
  }
);
