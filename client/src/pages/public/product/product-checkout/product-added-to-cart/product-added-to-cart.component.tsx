import { BtnClose, Modal } from "components";
import useWindowDimensions from "hooks/useWindowDimensions";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./product-added-to-cart.module.scss";
const ProductAddedToCart = ({
  imgCover,
  title,
  isProductAdded,
  setIsProductAdded,
}: {
  imgCover: string;
  title: string;
  isProductAdded: boolean;
  setIsProductAdded: (e: React.SetStateAction<boolean>) => void;
}) => {
  const { width } = useWindowDimensions();
  const content = (
    <div
      className={`${styles["product-added"]} ${
        isProductAdded && styles.active
      }`}
    >
      <div className={styles.success}>Thêm vào giỏ hàng thành công</div>
      <div className={` gap-12px flex-vt-ct`}>
        <img src={imgCover} alt="Product" />
        <p className={styles.title}>{title}</p>
      </div>
      <Link className={styles["btn-cart"]} to="/cart">
        Xem giỏ hàng
      </Link>
      <BtnClose
        text=""
        className={styles["btn-close"]}
        onClick={() => setIsProductAdded(false)}
      />
    </div>
  );
  return width > 1200 ? (
    content
  ) : (
    <Modal isOpen={isProductAdded}>{content}</Modal>
  );
};

export default ProductAddedToCart;
