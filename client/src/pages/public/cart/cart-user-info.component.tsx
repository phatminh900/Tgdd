import React, { useState } from "react";
import { Input } from "components";
import { useAuth } from "context/auth.context";
import styles from "./cart-user-info.module.scss";
import { useAppDispatch, useAppSelector } from "store/hooks.store";
import { cartSliceAction } from "store/cart/cart-slice";
import useCartStateHook from "store/cart/cart-slice.hook";
const CartUserInfo = () => {
  const user = useAuth()?.user;
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.appState);
  const { userAddress } = useCartStateHook();

  const [address, setAddress] = useState(userAddress || "");

  const setUserAddress = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    dispatch(cartSliceAction.setUserAddress({ address: value }));
    setAddress(value);
  };
  // @ts-ignore

  return (
    <div className={styles["cart__user-info"]}>
      <p>Thông tin khách hàng</p>
      <form
        data-error-msg={appState.error}
        className={`${styles["cart__form"]} gap-12px`}
      >
        <>
          <Input
            type="text"
            label={user?.name!}
            id="user-name"
            value={user?.name!}
            className={` ${
              appState.error && !user?.name && styles["cart__input-error"]
            }`}
          />
          <Input
            className={`${styles["cart__user-email-input"]} ${
              appState.error && !user?.email && styles["cart__input-error"]
            }`}
            value={user?.email!}
            label="Email"
            id="user-login-email"
            type="email"
          />
        </>

        <Input
          onChange={setUserAddress}
          className={
            appState.error && !address ? styles["cart__input-error"] : ""
          }
          label="Address"
          id="address"
          value={address}
          type="text"
        />
      </form>
    </div>
  );
};

export default CartUserInfo;
