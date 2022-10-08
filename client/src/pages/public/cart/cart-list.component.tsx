import React from "react";
import CartItem from "./cart-item.component";
import useCartListHook from "./cart-list.hook";
import styles from "./cart-list.module.scss";
const CartList = () => {
  const cart = useCartListHook();
  return (
    <ul className={styles.cart__list}>
      {cart.map((product) => (
        <CartItem
          discount={product.discount}
          link={product.link}
          quantity={product.quantity}
          key={product.id}
          id={product.id}
          title={product.title}
          currentColorImgCover={product.currentColorImgCover}
          price={product.price}
          promotion={product.promotion}
          colors={product.colors}
          imgColorsCover={product.imgColorsCover}
          currentColor={product.currentColor}
        />
      ))}
    </ul>
  );
};

export default CartList;
