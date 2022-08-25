import mongoose, { Model, Schema, Types } from "mongoose";
import requiredField from "utils/requiredField";
import Phone from "./phone.model";

export interface ReviewDocument {
  review: string;
  rating: number;
  phone: Types.ObjectId;
  user: Types.ObjectId;
}
type Category = "phone" | "laptop";

export interface ReviewModel extends Model<ReviewDocument> {
  calcRatingAverage: (productId: string, category: Category) => void;
}
const phoneReviewSchema = new mongoose.Schema(
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
      ref: "Phone",
      required: [true, "Review must belong to a phone"],
    },

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
// calc ratingAvg
phoneReviewSchema.statics.calcRatingAverage = async function (
  productId: object,
  category: Category
) {
  const statitis = await this.aggregate([
    { $match: productId },
    {
      $group: {
        _id: `$${category}`,
        ratingQuantity: { $sum: 1 },
        ratingAvarage: { $avg: `$rating` },
      },
    },
  ]);
  if (!statitis?.length) {
    this.findByIdAndUpdate(productId, {
      rating: 0,
      ratingQuantity: 0,
    });
    return;
  }
  await Phone.findByIdAndUpdate(Object.values(productId), {
    ratingQuantity: statitis[0].ratingQuantity,
    ratingAverage: statitis[0].ratingAverage,
  });
  return statitis;
};
phoneReviewSchema.post("save", async function (doc) {
  // @ts-ignore
  const document = { ...this };
  // @ts-ignore get t
  const { _doc } = document;
  const { review, rating, __v, user, _id, ...product } = _doc;
  // get the product Key

  // @ts-ignore
  // product ={[product]:id}
  (this.constructor as Model<ReviewDocument>).calcRatingAverage(product);
  // next();
});
phoneReviewSchema.post(/^findOneAnd/, function (doc) {
  // console.log(doc);
  if (doc) {
    // @ts-ignore
    const { _doc } = doc;
    const { review, rating, user, __v, _id, ...product } = _doc;

    // @ts-ignore
    // product ={[product]:id}

    (doc.constructor as Model<ReviewDocument>).calcRatingAverage(product);
  }
});
phoneReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});
const PhoneReview = mongoose.model<ReviewDocument, ReviewModel>(
  "PhoneReview",
  phoneReviewSchema
);
export default PhoneReview;
