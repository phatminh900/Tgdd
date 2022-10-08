import { useState, useEffect } from "react";
import useWindowDimensions from "hooks/useWindowDimensions";
import { cartSliceAction } from "store/cart/cart-slice";
import { useAppDispatch } from "store/hooks.store";
import { ICartProductDocument } from "store/cart/cartProductDocument";

const useProductCheckoutHook = (onToggleModal: () => void) => {
  const dispatch = useAppDispatch();
  const [isProductAdded, setIsProductAdded] = useState(false);
  const { width } = useWindowDimensions();
  const addToCart = (product: ICartProductDocument) => {
    setIsProductAdded(true);
    onToggleModal();
    //
    dispatch(cartSliceAction.addToCart(product));
    // dispatch(cartSliceAction.addToCart(product));
  };
  useEffect(() => {
    if (isProductAdded && width > 1200)
      document
        .querySelector(".cart-section")
        ?.scrollIntoView({ behavior: "smooth" });
    const timer = setTimeout(() => {
      setIsProductAdded(false);
    }, 2000);
    return () => clearTimeout(timer);
  });
  return { addToCart };
};

export default useProductCheckoutHook;
