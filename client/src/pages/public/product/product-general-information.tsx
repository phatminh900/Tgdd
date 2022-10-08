import React from "react";
import styles from "./product-general-information.module.scss";
import { v4 as uuidv4 } from "uuid";
import { ICurrentProduct } from "./product.interface";
interface ProductGeneralInformationProps extends ICurrentProduct {
  imgSrc: string;
  className?: string;
}
const ProductGeneralInformation = ({
  currentProduct,
  className,
  imgSrc,
}: ProductGeneralInformationProps) => {
  return (
    <div className={`${styles["general-information"]} ${className}`}>
      {/*  */}
      <h3>Thông tin sản phẩm</h3>
      {currentProduct.generalInformation.map((info) => (
        <p key={uuidv4()}>{info}</p>
      ))}

      <img
        src={currentProduct?.imgs.imgGeneralInformation[0]}
        alt="general information about iphone"
      />
    </div>
  );
};

export default ProductGeneralInformation;
