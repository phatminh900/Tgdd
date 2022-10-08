import { useEffect, useState } from "react";
import { getProductSlug, Resources } from "service/product.service";
import {
  type ILaptopDocument,
  IPhoneDocument,
} from "interfaces/allProductsType.interface";
let initial = true;
const useProductItemHook = (
  product: IPhoneDocument | ILaptopDocument,
  productType: "laptop" | "phone",
  url?: string
) => {
  //   identify currentType of product
  const getProductType = () => {
    switch (productType) {
      case "phone":
        return product as IPhoneDocument;
      case "laptop":
        return product as ILaptopDocument;

      default:
        const _exhaustiveCheck: never = productType;
        return _exhaustiveCheck;
    }
  };

  const [currentProduct, setCurrentProduct] = useState(getProductType());
  const [currentUrl, setCurrentUrl] = useState(product.slug);
  const changeCurrentStorage = (e: React.MouseEvent) => {
    // e.stopPropagation();
    const currentProductUrl = (e.target as HTMLDivElement).dataset.url!;
    setCurrentUrl(currentProductUrl);
  };
  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    const getOtherVersion = async () => {
      const otherProductVersion = await getProductSlug(
        currentProduct.category as Resources,
        currentUrl
      );
      // it's an arr
      if (!otherProductVersion || !otherProductVersion.length) return;
      otherProductVersion &&
        setCurrentProduct(otherProductVersion[0] as IPhoneDocument);
    };
    getOtherVersion();
  }, [currentUrl, currentProduct.category]);

  return { currentProduct, changeCurrentStorage, setCurrentUrl };
};

export default useProductItemHook;
