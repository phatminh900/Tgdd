export interface ICartProductDocument {
  title: string;
  price: number;
  promotion: string[];
  colors: string[];
  imgColorsCover: Array<string>;
  currentColorImgCover: string;
  id: string;
  currentColor: string;
  quantity: number;
  discount: { code: string; discount: number }[];
  link: string;
}
