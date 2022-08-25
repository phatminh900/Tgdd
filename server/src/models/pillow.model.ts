import mongoose from "mongoose";
import requiredField from "utils/requiredField";
import ProductDocument from "./productDocument.model";

const pillowSchema = new mongoose.Schema(
  {
    type: { type: String, default: "Pillow" },
    title: {
      ...requiredField(String, "Title is required"),
      unique: true,
      minLength: [15, "Title at least 15 characters"],
    },
    slug: String,
    size: {
      type: Array,
      // enum: {
      //   values: ["King", "Queen", "Standard"],
      //   message: "{VALUE} is not supported",
      // },
    },
    quantity: {
      ...requiredField(Number, "Quantity is required"),
      min: 1,
      default: 1,
    },
    price: {
      ...requiredField(Number, "Price is required"),
      min: 10,
    },
    description: {
      ...requiredField(String, "Description is required"),
      minLength: [100, "Description must at least 100 characters"],
    },
    features: {
      type: Array,
      required: "Features is required",
    },
    comfortmExchange: {
      type: String,
      default: `As your sleep experts, we want to ensure your mattress is as comfortable and supportive as possible for years to come which is why we offer a 60-day comfort trial with your purchase. If you’re not fully satisfied with your selection, simply arrange to come back in-store within 60 days to choose a new mattress at an equal or greater value, hassle-free. Contact us for details.`,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
pillowSchema.pre("save", function (next) {
  this.slug = (this.title as string).toLowerCase().split(" ").join("-");
  next();
});
pillowSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "pillow",
  localField: "_id",
});
const Pillow = mongoose.model<ProductDocument>("Pillow", pillowSchema);
export default Pillow;
