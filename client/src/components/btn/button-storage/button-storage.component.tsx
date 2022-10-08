import React from "react";
import {
  IPhoneDocument,
  ILaptopDocument,
} from "interfaces/allProductsType.interface";
import styles from "./button-storage.module.scss";
interface ButtonStorageProps {
  currentProduct: IPhoneDocument | ILaptopDocument;
  changeCurrentStorage?: (e: React.MouseEvent) => void;
  url: string;
  className?: string;
  value: string | number;
}
const ButtonStorage = ({
  currentProduct,
  changeCurrentStorage,
  url,
  className,
  value,
}: ButtonStorageProps) => {
  return (
    <button
      data-url={url}
      onClick={changeCurrentStorage}
      className={`${styles.btn} btn ${className} ${
        currentProduct.configuration.internalMemory === +value
          ? styles.active
          : ""
      }`}
    >
      {value}GB
    </button>
  );
};

export default ButtonStorage;
