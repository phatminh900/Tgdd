import mongoose, { Model, Schema, Types } from "mongoose";
import requiredField from "utils/requiredField";

export interface IReviewDocument {
  review: string;
  rating: number;
  laptop?: Types.ObjectId;
  phone?: Types.ObjectId;
  photo?: string;
  user: Types.ObjectId;
}
type Category = "phone" | "laptop";

export interface ReviewModel extends Model<IReviewDocument> {
  calcRatingAverage: (productId: string, category: Category) => void;
}
const reviewSchema = new mongoose.Schema(
  {
    review: {
      ...requiredField(String, "Review must have review"),
    },
    rating: {
      ...requiredField(Number, "Review must have rating"),
      min: 1,
      max: 5,
    },
    phone: {
      type: Schema.Types.ObjectId,
      ref: "phone",
    },
    laptop: {
      type: Schema.Types.ObjectId,
      ref: "laptop",
    },
    photo: String,
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "Review must belong to a user"],
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// prevent duplicate review
reviewSchema.index({ user: 1, phone: 1 }, { unique: true });
reviewSchema.index({ user: 1, laptop: 1 }, { unique: true });
// calc ratingAvgcd
reviewSchema.statics.calcRatingAverage = async function (
  productId: object,
  Model: Model<any>
) {
  const statitis = await this.aggregate([
    { $match: productId },
    {
      $group: {
        _id: null,
        ratingQuantity: { $sum: 1 },
        ratingAvarage: { $avg: `$rating` },
      },
    },
  ]);
  const id = Object.values(productId)[0];
  if (!statitis?.length || !this.length) {
    await Model?.findByIdAndUpdate(id, {
      ratingAverage: 0,
      ratingQuantity: 0,
    });
    return;
  }
  const updatedRating = {
    ratingAverage: statitis[0].ratingAvarage,
    ratingQuantity: statitis[0].ratingQuantity,
  };

  await Model?.findByIdAndUpdate(id, {
    ...updatedRating,
  });

  return statitis;
};

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});
const Review = mongoose.model<IReviewDocument, ReviewModel>(
  "Review",
  reviewSchema
);
export default Review;
