import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createBookingCheckout } from "service/booking.service";
import { cartSliceAction } from "store/cart/cart-slice";
import { useAppDispatch, useAppSelector } from "store/hooks.store";

const useHomeHook = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.appState.isLoading);
  const navigate = useNavigate();
  // temporary using to create booking checkout
  const { pathname, search } = useLocation();
  useEffect(() => {
    if (search) {
      // delete cart in background before page reload......
      // setTimeout(() => dispatch(cartSliceAction.clearCart()), 0);
      dispatch(cartSliceAction.clearCart());
      dispatch(createBookingCheckout(search));
      navigate(pathname.split("?")[0]);
      // window.location.href = pathname.split("?")[0];
    }
  }, [search, dispatch, pathname, navigate]);

  return { isLoading };
};

export default useHomeHook;
