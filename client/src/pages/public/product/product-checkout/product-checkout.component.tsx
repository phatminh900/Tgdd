import React, { useState } from "react";
import { ProductProps } from "../product.hook";
import { v4 as uuidv4 } from "uuid";
import { AiFillCaretDown } from "react-icons/ai";
import styles from "./product-checkout.module.scss";
import formatCurrency from "utils/formatCurrency";
import BtnBuy from "components/btn/btn-buy/btn-buy.component";
import { Link, useLocation } from "react-router-dom";
import { ICartProductDocument } from "store/cart/cartProductDocument";
import QuantityBox from "components/quantity-box/quantity-box.component";
import useQuantityBoxHook from "components/quantity-box/quantity-box.hook";
interface ProductCheckoutProps extends ProductProps {
  currentColor: string;
  onToggleModal: () => void;
  isOpenModal: boolean;
  onChangeCurrentColor: (e: React.MouseEvent) => void;
  addToCart: (product: ICartProductDocument) => void;
}
const ProductCheckout = ({
  onToggleModal,
  isOpenModal,
  currentProduct,
  addToCart,
  onChangeCurrentColor,
  currentColor,
}: ProductCheckoutProps) => {
  const { pathname } = useLocation();
  const { quantity, setQuantity } = useQuantityBoxHook();
  const [isOpenPromotionBox, setIsOpenPromotionBox] = useState(false);
  const addProductToCartHandler = () => {
    const { _id, title, price, promotion, colors, imgColorsCover, discount } =
      currentProduct;
    const product = {
      title,
      id: _id,
      price,
      currentColor,
      discount,
      promotion,
      link: pathname,
      colors,
      imgColorsCover,
      quantity: quantity,
      currentColorImgCover: imgColorsCover[colors.indexOf(currentColor)],
    };
    addToCart(product);
  };
  if (!currentProduct) return null;
  return (
    <>
      <div className={`${styles["product-checkout"]} center-both-absolute`}>
        <div className={styles["product-checkout__header"]}>
          <p>{currentProduct.title}</p>
          <p className={styles["product-checkout__price"]}>
            {formatCurrency(currentProduct.price)}₫
          </p>
          <button
            onClick={() => onToggleModal()}
            className={styles["product-checkout__btn-close"]}
          >
            &times;
          </button>
        </div>
        <div className={styles["product-checkout__body"]}>
          <p
            className={`${styles["product-checkout__notification"]} text-bold`}
          >
            Chọn màu:
          </p>
          <ul
            className={`${styles["product-checkout__select-color"]} gap-6px flex-vt-ct`}
          >
            {currentProduct.imgColorsCover.map((_, i) => (
              <li key={uuidv4()}>
                <button
                  data-color={currentProduct.colors[i]}
                  onClick={onChangeCurrentColor}
                  className={`${styles["product-checkout__product"]} gap-6px  ${
                    currentProduct.colors[i] === currentColor
                      ? styles.active
                      : ""
                  } flex-vt-ct`}
                >
                  <img
                    className={`${styles["product-checkout__img"]}  flex-both-ct `}
                    src={currentProduct.imgColorsCover[i]}
                    alt="product color"
                  />
                  <span
                    className={` ${styles["product-checkout__circle"]} flex-both-ct`}
                  ></span>
                  <p className={styles["product-overview-tab-title"]}>
                    {currentProduct.colors[i]}
                  </p>
                </button>
              </li>
            ))}
          </ul>
          <div
            className={`${styles["product-checkout__quantity-box"]} flex-vt-ct`}
          >
            <p className="text-bold">Chọn số lượng:</p>
            <QuantityBox quantity={quantity} setQuantity={setQuantity} />
          </div>
          <div
            className={`${styles["product-checkout__promotion"]} ${
              isOpenPromotionBox ? styles.active : ""
            }`}
          >
            <ul className={styles["product-checkout__promotion-list"]}>
              {currentProduct.promotion.map((promo) => (
                <li key={uuidv4()}>{promo}</li>
              ))}
            </ul>
            <button
              onClick={() => setIsOpenPromotionBox((prev) => !prev)}
              className={` ${styles["product-checkout__open-promotion"]} gap-8px flex-vt-ct`}
            >
              {!isOpenPromotionBox ? "Xem tất cả khuyến mãi" : "Thu gọn"}{" "}
              <AiFillCaretDown />
            </button>
            {/*  */}
            <BtnBuy
              onClick={addProductToCartHandler}
              text="Thêm vào giỏ hàng"
            />
            <Link
              target="_blank"
              to="/cart"
              className={`${styles["product-checkout__see-cart"]} text-center color-tertiary`}
            >
              Xem giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ProductCheckout);
