export interface IReviewDocument {
  _id: string;
  review: string;
  rating: number;
  photo?: string;
  phone: string;
  user: {
    _id: string;
    name: string;
  };
}

export interface IProductReview {
  category: string;
  firm: string;
  id: string;
  imgCover: string;
  price: number;
  ratingAverage: number;
  ratingQuantity: number;
  reviews: IReviewDocument[];
  title: string;
  _id: string;
}
