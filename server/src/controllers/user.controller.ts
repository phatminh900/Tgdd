// import User from "models/user.model";
// import { NextFunction, Request, Response } from "express";
// import catchAsync from "utils/catchAsync";
// import { omit } from "lodash";
// import { createOneHandler } from "factory.controller";
// import { createOne } from "services/factory.service";
// export const signup = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const user = await createOne(User, req.body);
//     console.log(omit(user, "password"));
//     res.status(201).json({
//       status: "success",
//       data: {
//         user,
//       },
//     });
//   }
// );
