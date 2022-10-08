import { useReducer, useEffect, useState } from "react";
import {
  ILaptopDocument,
  IPhoneDocument,
} from "interfaces/allProductsType.interface";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks.store";
import { omit } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { ICartProductDocument } from "store/cart/cartProductDocument";
import { cartSliceAction } from "store/cart/cart-slice";
import useWindowDimensions from "hooks/useWindowDimensions";
import { ICurrentProduct } from "./product.interface";

export interface ProductProps extends ICurrentProduct {}

enum ProductModalAction {
  TOGGLE_MODAL = "TOGGLE_MODAL",
  OPEN_CHECKOUTMODAL = "OPEN_CHECKOUTMODAL",
  CLOSE_CHECKOUTMODAL = "CLOSE_CHECKOUTMODAL",
}

interface InitialStateProductModal {
  isOpenCheckoutModal: boolean;
  isOpenModal: boolean;
}
const initialState: InitialStateProductModal = {
  isOpenCheckoutModal: false,
  isOpenModal: false,
};

const productModalReducer = (
  state: InitialStateProductModal,
  action: { type: ProductModalAction }
) => {
  switch (action.type) {
    case ProductModalAction.TOGGLE_MODAL:
      return { ...state, isOpenModal: !state.isOpenModal };

    case ProductModalAction.OPEN_CHECKOUTMODAL: {
      return { ...state, isOpenCheckoutModal: true };
    }
    case ProductModalAction.CLOSE_CHECKOUTMODAL: {
      return { ...state, isOpenCheckoutModal: false };
    }
    default: {
      return initialState;
    }
  }
};

const useProductHook = (currentProduct: IPhoneDocument | ILaptopDocument) => {
  const [productModalState, dispatchProductModalState] = useReducer(
    productModalReducer,
    initialState
  );
  const { width } = useWindowDimensions();
  const isLoading = useAppSelector((state) => state.appState.isLoading);

  const [isProductAdded, setIsProductAdded] = useState(false);
  const [currentHighlightsImgNumber, setCurrentHighlightsImgNumber] =
    useState(0);
  const onSetCurrentHighlightsImgNumber = (number: number) => {
    setCurrentHighlightsImgNumber(number);
  };
  const onToggleModal = () => {
    dispatchProductModalState({ type: ProductModalAction.TOGGLE_MODAL });
  };

  const onOpenCheckoutModal = () =>
    dispatchProductModalState({ type: ProductModalAction.OPEN_CHECKOUTMODAL });
  const onCloseCheckoutModal = () =>
    dispatch({ type: ProductModalAction.CLOSE_CHECKOUTMODAL });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // temporary

  // const { isOpenModal, setIsOpenModal } = useModalHook();
  const { slug } = useParams();

  //  it can be undefined but will redirect to Notfound page

  const [currentColor, setCurrentColor] = useState(currentProduct?.colors[0]);

  const slidesImgs = currentProduct?.imgs.imgHighlights;
  const linksColor = Object.keys(
    omit(currentProduct?.imgs, [
      "imgHighlights",
      "imgConfiguration",
      "imgGeneralInformation",
    ])
  ).map((key) => ({ id: uuidv4(), title: key, hash: key }));

  const links = [
    {
      id: uuidv4(),
      title: "Điểm nổi bậc",
      hash: "hightlight",
    },
    ...linksColor,
    {
      id: uuidv4(),
      title: "Thông số kĩ thuật",
      hash: "configurations",
    },
    {
      id: uuidv4(),
      title: "Thông tin sản phẩm",
      hash: "general-information",
    },
  ];
  const addToCart = (product: ICartProductDocument) => {
    setIsProductAdded(true);
    onToggleModal();
    //
    dispatch(cartSliceAction.addToCart(product));
    // dispatch(cartSliceAction.addToCart(product));
  };
  const changeCurrentStorage = (e: React.MouseEvent) => {
    const currentProductUrl = (e.target as HTMLDivElement).dataset.url!;
    navigate(location.pathname.replace(slug!, currentProductUrl));
    // navigate()
  };
  const changeCurrentColor = (e: React.MouseEvent) =>
    setCurrentColor(
      (e.target as HTMLButtonElement).closest("button")!.dataset.color!
    );

  function onOpenProductCarousel(e: React.MouseEvent) {
    // @ts-ignore this===tab
    navigate(location.pathname + `#${this}`);
    dispatchProductModalState({ type: ProductModalAction.CLOSE_CHECKOUTMODAL });
    dispatchProductModalState({ type: ProductModalAction.TOGGLE_MODAL });
  }
  // Product added
  useEffect(() => {
    if (isProductAdded && width > 1200) {
      document
        .querySelector(".cart-section")
        ?.scrollIntoView({ behavior: "smooth" });
      const timer = setTimeout(() => {
        setIsProductAdded(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  });

  useEffect(() => {
    setCurrentColor(currentProduct?.colors[0]);
  }, [currentProduct]);

  // prevent scroll when model is open
  if (productModalState.isOpenModal) {
    document.body.style.overflowY = "hidden";
    document.body.style.height = "100vh";
    // document.body.style.position = "fixed";
  }
  if (!productModalState.isOpenModal) {
    document.body.style.overflowY = "auto";
    document.body.style.height = "auto";
    // document.body.style.position = "static";
  }
  return {
    productModalState,
    currentColor,
    isLoading,
    slidesImgs,
    currentHighlightsImgNumber,
    onSetCurrentHighlightsImgNumber,
    onToggleModal,
    onOpenCheckoutModal,
    onCloseCheckoutModal,
    changeCurrentStorage,
    isProductAdded,
    setIsProductAdded,
    addToCart,
    changeCurrentColor,
    onOpenProductCarousel,
    currentProduct,
    linksColor,
    width,
    links,
  };
};
export default useProductHook;
