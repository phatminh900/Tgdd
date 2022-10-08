import { JWTKEY } from "app-constants/browser.constatnt";
import axios from "axios";
import { useAuth } from "context/auth.context";
import Cookies from "js-cookie";
import { appStateActions } from "store/appState/app-state-slice";
import useCartStateHook from "store/cart/cart-slice.hook";
import { useAppDispatch } from "store/hooks.store";
const useCartHook = () => {
  const cart = useCartStateHook().cart;
  const user = useAuth()?.user;
  const cartState = useCartStateHook();
  const dispatch = useAppDispatch();
  const { discount, userAddress } = cartState;
  const userId = user ? user._id : null;
  const checkout = async () => {
    try {
      if (!userAddress)
        return dispatch(
          appStateActions.setError(`Please fill up all the fields.`)
        );
      const { data } = await axios.post(
        "/api/v1/booking/create-checkout-session",
        {
          cart,
          discount,
          userAddress,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get(JWTKEY)}`,
          },
        }
      );
      dispatch(appStateActions.resetState());
      window.location.href = data.session.url;
    } catch (error) {
      dispatch(appStateActions.setError(error));
    }
  };

  return { cart, checkout };
};

export default useCartHook;
