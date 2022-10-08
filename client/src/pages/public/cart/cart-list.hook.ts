import { useAppSelector } from "store/hooks.store";

const useCartListHook = () => {
  const cart = useAppSelector((state) => state.cart.cart);
  return cart;
};

export default useCartListHook;
