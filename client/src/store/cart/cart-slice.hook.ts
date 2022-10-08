import { useAppSelector } from "store/hooks.store";

const useCartStateHook = () => {
  return useAppSelector((state) => state.cart);
};

export default useCartStateHook;
