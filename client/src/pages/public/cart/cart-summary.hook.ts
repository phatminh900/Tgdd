import useCartStateHook from "store/cart/cart-slice.hook";

const useCartSummaryHook = () => {
  const cartState = useCartStateHook();

  const totalPrice = cartState.cart.reduce(
    (total, pro) => pro.price * pro.quantity + total,
    0
  );
  return { totalPrice };
};

export default useCartSummaryHook;
