import mongoose, {
  DocumentDefinition,
  QueryOptions,
  UpdateQuery,
  Model,
  PopulateOptions,
} from "mongoose";

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
// export async function createOne<T>(
//   Model: Model<T>,
//   input: DocumentDefinition<ProductDocument>
// ) {
//   {
//     try {
//       return await Model.create(input);
//     } catch (error) {
//       throw error;
//     }
//   }
// }

export const findAllDocs = async <T>(
  Model: Model<T>,
  queryOptions: object,
  populateOptions?: PopulateOptions
) => {
  try {
    return populateOptions
      ? await Model.find(queryOptions).populate(populateOptions)
      : await Model.find(queryOptions);
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
  populateOption?: PopulateOptions
) => {
  try {
    return populateOption
      ? await Model.findOne({ slug }).populate(populateOption)
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
