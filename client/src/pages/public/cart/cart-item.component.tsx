import { useState, useEffect } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import Price from "components/price/price.component";
import styles from "./cart-item.module.scss";
import { useAppDispatch } from "store/hooks.store";
import { cartSliceAction } from "store/cart/cart-slice";
import QuantityBox from "components/quantity-box/quantity-box.component";
import useQuantityBoxHook from "components/quantity-box/quantity-box.hook";
import { ICartProductDocument } from "store/cart/cartProductDocument";
import useCartStateHook from "store/cart/cart-slice.hook";
interface CartItemProps extends ICartProductDocument {}
const CartItem = ({
  currentColor,
  title,
  link,

  quantity: prevQuantity,
  price,
  imgColorsCover,
  currentColorImgCover,
  colors,
  id,
  promotion,
}: CartItemProps) => {
  const cartState = useCartStateHook();
  const { quantity, setQuantity } = useQuantityBoxHook(prevQuantity);

  const [isOpenPromotionList, setIsOpenPromotionList] = useState(false);
  const [isOpenColorList, setIsOpenColorList] = useState(false);

  const dispatch = useAppDispatch();
  const changeCurrentColor = (color: string) => {
    dispatch(
      cartSliceAction.changeCurrentColorProduct({
        id,
        color,
      })
    );
    setIsOpenColorList(false);
  };
  useEffect(() => {
    // check if modify or not
    if (prevQuantity !== quantity)
      dispatch(cartSliceAction.changeCurrentQuantityProduct({ id, quantity }));
    cartState.discountCode &&
      dispatch(
        cartSliceAction.applyDiscount({ discountCode: cartState.discountCode })
      );
  }, [quantity, dispatch, id, prevQuantity, cartState.discountCode]);

  return (
    <li className={styles["cart-item"]}>
      <div className={styles["cart-item__left"]}>
        <div className={`${styles["cart-item__info"]} flex`}>
          <div
            className={`${styles["cart-item__img-box"]} flex-vt-ct gap-12px`}
          >
            <Link to={link}>
              <img
                className={styles["cart-item__img"]}
                src={currentColorImgCover}
                alt="Product"
              />
            </Link>
            <button
              onClick={() => dispatch(cartSliceAction.removeFromCart({ id }))}
              className={styles["cart-item__btn-remove"]}
            >
              &times;
            </button>
          </div>
          <div>
            <Link to={link}>
              <h4>{title}</h4>
            </Link>
            <div className={`${styles["cart-item__promotion"]} `}>
              <ul
                className={`${styles["cart-item__promotion-list"]} ${
                  isOpenPromotionList && styles.active
                }`}
              >
                {promotion.map((pro) => (
                  <li key={uuidv4()}>{pro}</li>
                ))}
              </ul>
              <button
                className={`${styles["cart-item__btn-promotion"]} ${
                  isOpenPromotionList && styles.active
                } flex-vt-ct`}
                onClick={() => setIsOpenPromotionList((prev) => !prev)}
              >
                {!isOpenPromotionList
                  ? `Xem  ${promotion.length} khuyến mãi`
                  : `Thu gọn `}
                <AiFillCaretDown />
              </button>
            </div>
            <div className={styles["cart-item__colors"]}>
              <button
                className={`${styles["cart-item__btn-color"]} gap-6px flex-vt-ct`}
                onClick={() => setIsOpenColorList((prev) => !prev)}
              >
                Màu:{currentColor} <AiFillCaretDown />
              </button>
              <ul
                className={`${styles["cart-item__colors-list"]} ${
                  isOpenColorList && styles.active
                }`}
              >
                {imgColorsCover.map((img, i) => (
                  <li
                    key={uuidv4()}
                    onClick={() => changeCurrentColor(colors[i])}
                    className={`${styles["cart-item__colors-item"]} ${
                      currentColor === colors[i] && styles.active
                    } flex-vt-ct`}
                  >
                    <img src={img} alt="product color" />
                    <p>{colors[i]}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["cart-item__right"]}>
        <Price price={price} />
        <QuantityBox quantity={quantity} setQuantity={setQuantity} />
      </div>
    </li>
  );
};

export default CartItem;
