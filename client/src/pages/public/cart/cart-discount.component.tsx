import React, { useState } from "react";
import styles from "./cart-discount.module.scss";
import { TbDiscount2 } from "react-icons/tb";
import { Input } from "components";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useAppDispatch } from "store/hooks.store";
import { cartSliceAction } from "store/cart/cart-slice";
import useCartStateHook from "store/cart/cart-slice.hook";
const CartDiscount = () => {
  const dispatch = useAppDispatch();
  const cartState = useCartStateHook();
  const cart = cartState.cart;

  const discountCodes = cart[0].discount;
  const [isValidDiscountCode, setIsValidDiscountCode] = useState(true);
  const [discountValue, setDiscountValue] = useState(0);
  const [discountCode, setDiscountCode] = useState(
    cartState.discountCode || ""
  );

  const [isOpenDiscountBox, setIsOpenDiscountBox] = useState(false);
  const applyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    const validDiscoutCode = discountCodes.find(
      (discount) => discount.code === discountCode
    );
    if (!validDiscoutCode) {
      return setIsValidDiscountCode(false);
    }
    setIsValidDiscountCode(true);
    setDiscountValue(validDiscoutCode.discount);
    dispatch(
      cartSliceAction.applyDiscount({
        discountCode,
        discount: validDiscoutCode.discount,
      })
    );
  };

  return (
    <div className={styles["cart__discount"]}>
      <button
        onClick={() => setIsOpenDiscountBox((prev) => !prev)}
        className={`${styles["cart__btn-control"]} flex-vt-ct gap-8px`}
      >
        <TbDiscount2 /> Sử dụng mã giảm giá{" "}
        {!isOpenDiscountBox ? <AiFillCaretDown /> : <AiFillCaretUp />}
      </button>
      <form
        data-invalid-discount={!isValidDiscountCode ? "Invalid discount" : ""}
        onSubmit={applyDiscount}
        className={`${styles["cart__discount-box"]} flex gap-12px`}
      >
        {isOpenDiscountBox && (
          <>
            <Input
              id="Discount-place"
              label={
                discountValue && isValidDiscountCode
                  ? `Giảm ${discountValue}%`
                  : "Nhập mã giảm giá"
              }
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              type="text"
            />
            <div>
              <button className={styles["cart__btn-apply"]} type="submit">
                Apply
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CartDiscount;
