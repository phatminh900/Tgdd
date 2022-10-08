import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICartProductDocument } from "./cartProductDocument";
interface CartState {
  cart: ICartProductDocument[];
  priceAfterApplyingDiscount: number;
  discountCode: string;
  discount: number;
  userAddress: string;
}
const initialState = {
  cart: [],
  priceAfterApplyingDiscount: 0,
  discountCode: "",
  discount: 0,
  userAddress: "",
} as CartState;
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    loadCart(
      state: CartState,
      action: PayloadAction<{
        cart: ICartProductDocument[];
        priceAfterApplyingDiscount: number;
        discountCode: string;
        userAddress: string;
      }>
    ) {
      state.cart = action.payload.cart;
      state.userAddress = action.payload.userAddress;
      state.discountCode = action.payload.discountCode;
      state.priceAfterApplyingDiscount =
        action.payload.priceAfterApplyingDiscount;
    },
    clearCart(state: CartState) {
      return (state = initialState);
    },
    addToCart(state: CartState, action: PayloadAction<ICartProductDocument>) {
      const productAlreadyInCart = state.cart.find(
        (product) =>
          product.title === action.payload.title &&
          product.currentColor === action.payload.currentColor
      );
      if (productAlreadyInCart)
        productAlreadyInCart.quantity =
          productAlreadyInCart.quantity + action.payload.quantity;

      if (!productAlreadyInCart) state.cart.push(action.payload);
    },
    removeFromCart(state: CartState, action: PayloadAction<{ id: string }>) {
      const removedIndex = state.cart.findIndex(
        (pro) => pro.id === action.payload.id
      );

      state.cart.splice(removedIndex, 1);
    },
    changeCurrentColorProduct(
      state: CartState,
      action: PayloadAction<{ id: string; color: string }>
    ) {
      const product = state.cart.find((pro) => pro.id === action.payload.id);
      if (!product) return state;
      product.currentColor = action.payload.color;
      product.currentColorImgCover =
        product.imgColorsCover[product.colors.indexOf(action.payload.color)];
    },
    changeCurrentQuantityProduct(
      state: CartState,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const product = state.cart.find((pro) => pro.id === action.payload.id);
      if (!product) return state;
      product.quantity = action.payload.quantity;
    },
    applyDiscount(
      state: CartState,
      action: PayloadAction<{ discountCode: string; discount?: number }>
    ) {
      let discount = 0;
      if (!discount) {
        // autoget by discountCode  (every product have the same discount)
        const discountPersentage = state.cart[0].discount.find(
          (dis) => dis.code === action.payload.discountCode
        );
        if (!discountPersentage) return state;
        discount = discountPersentage.discount;
      }
      const totalPrice = state.cart.reduce(
        (totalPrice, pro) => totalPrice + pro.quantity * pro.price,
        0
      );
      if (action.payload.discount) {
        discount = action.payload.discount;
      }
      state.priceAfterApplyingDiscount =
        totalPrice - (totalPrice * discount) / 100;
      state.discountCode = action.payload.discountCode;
      state.discount = discount;
    },
    setUserAddress(
      state: CartState,
      action: PayloadAction<{ address: string }>
    ) {
      state.userAddress = action.payload.address;
    },
  },
});
export const cartSliceAction = cartSlice.actions;

export default cartSlice.reducer;
