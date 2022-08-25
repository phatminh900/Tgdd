import mongoose, { Model, Schema, Types } from "mongoose";
import requiredField from "utils/requiredField";

export interface ReviewDocument {
  review: string;
  rating: number;

  phone?: Types.ObjectId;
  photo?: string;
  user: Types.ObjectId;
}
type Category = "phone" | "laptop";

export interface ReviewModel extends Model<ReviewDocument> {
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
reviewSchema.index({ phone: 1, user: 1 }, { unique: true });
// calc ratingAvg
reviewSchema.statics.calcRatingAverage = async function (
  productId: object,
  Model: Model<any>
) {
  // console.log(Model, "1111");

  // console.log(Model.modelName.toLowerCase());
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
// reviewSchema.post("save", async function (doc) {
//   // @ts-ignore
//   const document = { ...this };
//   // @ts-ignore get t
//   const { _doc } = document;
//   const { review, rating, __v, user, _id, ...product } = _doc;
//   // get the product Key

//   // @ts-ignore
//   // product ={[product]:id}
//   (this.constructor as Model<ReviewDocument>).calcRatingAverage(product);
//   // next();
// });
// reviewSchema.post(/^findOneAnd/, function (doc) {
//   // console.log(doc);
//   if (doc) {
//     // @ts-ignore
//     const { _doc } = doc;
//     const { review, rating, user, __v, _id, ...product } = _doc;

//     // @ts-ignore
//     // product ={[product]:id}

//     (doc.constructor as Model<ReviewDocument>).calcRatingAverage(product);
//   }
// });
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});
const Review = mongoose.model<ReviewDocument, ReviewModel>(
  "Review",
  reviewSchema
);
export default Review;
