import {
  IPhoneDocument,
  ILaptopDocument,
  IProductDocument,
} from "interfaces/allProductsType.interface";

export const isPhoneDocument = (
  document: IPhoneDocument | ILaptopDocument | IProductDocument
): document is IPhoneDocument => {
  return (document as IPhoneDocument).type === "phone";
};
export const isLaptopDocument = (
  document: ILaptopDocument | IPhoneDocument
): document is ILaptopDocument =>
  (document as ILaptopDocument).type === "laptop";
