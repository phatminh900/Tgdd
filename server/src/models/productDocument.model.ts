export default interface ProductDocument {
  title: string;
  size: string[];
  quantity: number;
  price: number;
  description: string;
  features: string[];
  comfortmExchange: string;
  imgCover: string;
  images: string[];
  type: string;
}
// export interface ProductDocumentMongoose
//   extends mongoose.Document,
//     ProductDocument {}
