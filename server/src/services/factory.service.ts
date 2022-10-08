import mongoose, {
  DocumentDefinition,
  QueryOptions,
  UpdateQuery,
  Model,
  PopulateOptions,
} from "mongoose";
import APIFeatures from "utils/apiFeatures";

export const createOne = async <T, U>(
  Model: Model<T>,
  input: DocumentDefinition<U>
) => {
  try {
    return await Model.create(input);
  } catch (error) {
    throw error;
  }
};

export const findAllDocs = async <T>(
  Model: Model<T>,
  queryOptions: object,
  populateOptions?: PopulateOptions
) => {
  try {
    const features = new APIFeatures(Model.find(), queryOptions)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    return populateOptions
      ? await features.query.populate(populateOptions)
      : await features.query;
  } catch (error) {
    throw error;
  }
};
export const findOne = async <T>(
  Model: Model<T>,
  id: string,
  populateOption?: PopulateOptions
) => {
  try {
    return populateOption
      ? await Model.findById(id).populate(populateOption)
      : await Model.findById(id);
  } catch (error) {
    throw error;
  }
};
export const findOneBySlug = async <T>(
  Model: Model<T>,
  slug: string,
  populateOption?: PopulateOptions,
  selectOptions?: string | string[]
) => {
  try {
    return populateOption
      ? await Model.findOne({ slug })
          .populate(populateOption)
          .select(selectOptions)
      : await Model.findOne({ slug });
  } catch (error) {
    throw error;
  }
};

export const updateOne = async <T, U>(
  Model: Model<T>,
  id: string,
  update: UpdateQuery<U>,
  options: QueryOptions = { new: true, runValidators: true }
) => {
  try {
    return await Model.findByIdAndUpdate(id, update, options);
  } catch (error) {
    throw error;
  }
};
export const deleteOne = async <T>(Model: Model<T>, id: string) => {
  try {
    return await Model.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
