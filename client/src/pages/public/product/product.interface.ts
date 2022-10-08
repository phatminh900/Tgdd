import {
  IPhoneDocument,
  ILaptopDocument,
} from "interfaces/allProductsType.interface";
export interface ProductProps {
  currentProduct: IPhoneDocument | ILaptopDocument;
}
export interface ICurrentProduct {
  currentProduct: IPhoneDocument | ILaptopDocument;
}
export interface IProductModalState {
  onToggleModal: (e?: React.MouseEvent) => void;
  onOpenProductCarousel?: (e: React.MouseEvent) => void;
  isOpenModal: boolean;
}
export interface IProductHighlightsImgState {
  currentHighlightsImgNumber?: number;
  onSetCurrentHighlightsImgNumber?: (number: number) => void;
}
export interface IProductCarousel {}
