export interface IUserBooking {
  products: {
    title: string;
    imgCover: string;
    quantity: number;
    currentColor: string;
    price: number;
    slug: string;
    category: string;
  }[];
  total: number;
  _id: string;
  userAddress: string;
  createdAt: Date;
}
export interface IUserAccount {
  email: string;
  name: string;
  _id: string;
}
