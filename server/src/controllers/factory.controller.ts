import { NextFunction, Request, Response } from "express";
import Phone from "models/phone.model";

import mongoose, { Model, PopulateOptions } from "mongoose";
import {
  createOne,
  findAllDocs,
  findOne,
  updateOne,
  deleteOne,
  findOneBySlug,
} from "services/factory.service";
import catchAsync from "utils/catchAsync";

export type PopulateOption = { path: string; select?: string };
export const isValidMongooseID = (
  req: Request,
  res: Response,
  next: NextFunction,
  value: string
) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid ID try again.",
    });
  }
  next();
};
export const createOneHandler = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const newDoc = await createOne(Model, req.body);
    res.status(200).json({
      status: "success",
      data: newDoc,
    });
  });

export const findAllDocsHandler = <T>(
  Model: Model<T>,
  populateOptions?: PopulateOptions
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const docs = await findAllDocs(Model, req.query, populateOptions);
    res.status(200).json({
      status: "success",
      results: docs.length,
      data: docs,
    });
  });
export const getOneHandler = <T>(
  Model: Model<T>,
  populateOption?: PopulateOptions
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const doc = populateOption
      ? await findOne(Model, id, populateOption)
      : await findOne(Model, id);

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
// slug version
export const getOneBySlugHandler = <T>(
  Model: Model<T>,
  populateOption?: PopulateOptions,
  selectOptions?: string | string[]
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const query = req.query;
    // valid id next middleware
    if (mongoose.Types.ObjectId.isValid(slug)) return next();
    const doc = populateOption
      ? // combine populate and query together
        await findOneBySlug(
          Model,
          slug,
          { ...populateOption, options: req.query },
          selectOptions
        )
      : await findOneBySlug(Model, slug);
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

//

export const updateOneHandler = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const doc = await updateOne(Model, id, req.body);
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
export const deleteOneHandler = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await deleteOne(Model, id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
