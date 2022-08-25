// import Review, { ReviewDocument } from "models/review.model";
// import { HydratedDocument, DocumentDefinition } from "mongoose";

// // import mongoose, {
// //   DocumentDefinition,
// //   FilterQuery,
// //   QueryOptions,
// //   UpdateQuery,
// // } from "mongoose";
// // import Pillow from "models/pillow.model";
// // import log from "utils/logger";
// // import {
// //   createOne,
// //   findAllDocs,
// //   findOne,
// //   updateOne,
// //   deleteOne,
// // } from "factory.service";
// export const createPillow = async (
//   input: DocumentDefinition<HydratedDocument<ReviewDocument>>
// ) => {
//   try {
//     return await Review.create(input);
//   } catch (error) {
//     throw error;
//   }
// };
// // export const findAllPillows = async () => {
// //   try {
// //     return await Pillow.find();
// //   } catch (error) {
// //     throw error;
// //   }
// // };
// // export const findPillow = async (id: string) => {
// //   try {
// //     return await Pillow.findById(id);
// //   } catch (error) {
// //     throw error;
// //   }
// // };
// // export const updatePillow = async (
// //   id: string,
// //   update: UpdateQuery<PillowDocument>,
// //   options: QueryOptions = { new: true, runValidators: true }
// // ) => {
// //   try {
// //     console.log(update);
// //     return await Pillow.findByIdAndUpdate(id, update, options);
// //   } catch (error) {
// //     throw error;
// //   }
// // };
// // export const deletePillow = async (id: string) => {
// //   try {
// //     return await Pillow.findByIdAndDelete(id);
// //   } catch (error) {
// //     throw error;
// //   }
// // };
