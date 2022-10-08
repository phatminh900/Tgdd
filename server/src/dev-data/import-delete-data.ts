import User from "models/user.model";
import mongoose from "mongoose";
import connect from "utils/connect";
// const Tour = require("../models/tourModel");
// const Users = require("../models/userModel");
// const Reviews = require("../models/reviewModel");
connect();
// create Model

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
