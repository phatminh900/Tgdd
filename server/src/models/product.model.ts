import mongoose from "mongoose";
import requiredField from "utils/requiredField";

const productsSchema = new mongoose.Schema({
  title: {
    ...requiredField(String, "A product must have title"),
  },

  original: requiredField(Boolean, "A product must have original"),
  price: requiredField(Number, "A product must have price"),
  ratingAverage: requiredField(Number, "A product must have rating Average"),
  ratingQuantity: requiredField(Number, "A product must have rating Quantity"),
  imgCover: requiredField(String, "A product must have an img cover"),
  category: requiredField(String, "A product must have category"),
  slug: requiredField(String, "A product must have slug"),
  recommend: {
    type: Boolean,
    default: true,
  },
});
productsSchema.index({ title: 1 });
const Product = mongoose.model("Product", productsSchema);
export default Product;
