import React, { useEffect } from "react";
import { LocalStorageKey } from "app-constants/browser.constatnt";
import { ROUTES } from "app-constants/navigation.constant";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { cartSliceAction } from "store/cart/cart-slice";
import { useAppDispatch, useAppSelector } from "store/hooks.store";
import { getItem, setItem } from "utils/browser-storage.util";
import styles from "./header-cart.module.scss";
let initial = true;
const HeaderCart = () => {
  const cartState = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const cartProductsLength = cartState.cart.reduce(
    (totalPro, pro) => pro.quantity + totalPro,
    0
  );
  // whenever cart change update localStorage
  useEffect(() => {
    if (initial) {
      initial = false;
      const cartJSON = getItem(LocalStorageKey.CART);
      const cartState = cartJSON
        ? JSON.parse(cartJSON)
        : {
            cart: [],
            priceAfterApplyingDiscount: 0,
            discountCode: "",
            userAddress: "",
          };
      dispatch(cartSliceAction.loadCart(cartState));
      return;
    }
    setItem(LocalStorageKey.CART, cartState);
  }, [cartState, dispatch]);
  return (
    <div
      className={`${styles.cart} cart-section flex-vt-ct   ${styles.action}`}
    >
      <Link to={ROUTES.CART} className="flex-both-ct">
        <p
          data-product-length={cartProductsLength}
          className={styles["cart-box"]}
        >
          <BiCart />
        </p>
        <span>Giỏ hàng</span>
      </Link>
    </div>
  );
};

export default HeaderCart;
