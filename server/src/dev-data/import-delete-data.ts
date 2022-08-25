import User from "models/user.model";
import mongoose from "mongoose";
import connect from "utils/connect";
// const Tour = require("../models/tourModel");
// const Users = require("../models/userModel");
// const Reviews = require("../models/reviewModel");
connect();
// create Model

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
// );

// const importData = async () => {
//   try {
//     // await Tour.create(tours);
//     // await Reviews.create(reviews);
//     await User.create(users, { validateBeforeSave: false });
//     console.log("Data successfully added!");
//   } catch (err) {
//     console.log(err);
//   } finally {
//     process.exit();
//   }
// };
const deleteData = async () => {
  try {
    // await Reviews.deleteMany();
    // await Tour.deleteMany();
    await User.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};
// if (process.argv[2] === "--delete") {
//   deleteData();
// }
// if (process.argv[2] === "--import") {
//   // importData();
// }import { mongoose } from 'mongoose';

// console.log(process.argv);
// console.log("delete");
(async () => {
  try {
    // await Reviews.deleteMany();
    // await Tour.deleteMany();

    await User.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(2312);
    console.log(err);
  } finally {
    process.exit();
  }
})();
process.exit();
