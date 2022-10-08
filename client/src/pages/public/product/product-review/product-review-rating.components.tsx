import React, { useState, useRef, useEffect } from "react";
import styles from "./product-review.module.scss";
import { BtnClose } from "components";
import { AiFillCamera } from "react-icons/ai";
import { ProductProps } from "../product.hook";
import ProductReviewStars from "./product-reviews-stars.component";
import { IAuthContext, useAuth } from "context/auth.context";
import { Link, useLocation } from "react-router-dom";
import { ReviewDocument } from "service/review.service";
import useAppStateHook from "store/appState/appState.hook";
import { useDispatch } from "react-redux";
import { appStateActions } from "store/appState/app-state-slice";
import BtnSubmit from "components/btn/btn-submit/btn-submit.component";
import Cookies from "js-cookie";
import { JWTKEY } from "app-constants/browser.constatnt";

export interface ProductReviewRatingProps extends ProductProps {
  setIsOpenModal: (state: boolean) => void;
  isOpenModal: boolean;
  onToggleModal: () => void;
  userPreChooseRating: number;
  onSubmitReview: (review: ReviewDocument, productId: string) => void;
  onPreChooseRating?: (number: number) => void;
}
const ProductReviewRating = ({
  currentProduct,
  onToggleModal,
  isOpenModal,
  onSubmitReview,
  userPreChooseRating,
  setIsOpenModal,
}: ProductReviewRatingProps) => {
  const { user } = useAuth() as IAuthContext;
  const { isLoading, error, isSuccess } = useAppStateHook(true);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // input
  const [userRating, setUserRating] = useState(userPreChooseRating);
  const onSetUserRating = (rating: number) => setUserRating(rating);
  const [reviewText, setReviewText] = useState("");
  const fileRef = useRef<null | HTMLInputElement>(null);
  // parent
  useEffect(() => {
    // after error user typing clear error
    userRating && reviewText && dispatch(appStateActions.resetState());
  }, [userRating, reviewText, dispatch]);
  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userRating) {
      return dispatch(appStateActions.setError("Please choose rating number."));
    }
    if (!reviewText) {
      return dispatch(
        appStateActions.setError("Please let us know your reviews..")
      );
    }
    if (!user) return;
    const form = new FormData();
    // @ts-ignore
    form.append("review", reviewText);
    form.append("productId", currentProduct?._id!);
    form.append(currentProduct.type, currentProduct?._id!);
    // @ts-ignore
    fileRef.current!.files[0] &&
      form.append(
        "photo",
        // @ts-ignore
        fileRef.current!.files[0],
        // @ts-ignore
        fileRef.current!.files[0].name
      );
    form.append("rating", String(userRating));
    form.append("user", user._id);

    onSubmitReview(form as unknown as ReviewDocument, currentProduct._id);
    dispatch(appStateActions.setFinishLoading());
  };
  if (!currentProduct) return null;

  return (
    <>
      <div
        className={`${styles["product-reviews-modal"]} center-both-absolute`}
      >
        <div
          className={`${styles["product-reviews-modal__header"]} flex-vt-ct`}
        >
          <p>Đánh giá</p>
          <BtnClose
            className={styles["product-reviews-modal__btn-close"]}
            onClick={() => setIsOpenModal(false)}
          />
        </div>
        <div className={styles["product-reviews-modal__body"]}>
          <div
            className={`${styles["product-reviews-modal__name"]} flex-vt-ct`}
          >
            <img src={currentProduct.imgCover!} alt="Product" />
            <p>{currentProduct.title}</p>
          </div>
          <ProductReviewStars
            isOpenModal={isOpenModal}
            onToggleModal={onToggleModal}
            onSetUserRating={onSetUserRating}
            userPreChooseRating={userRating}
          />
          <form
            onSubmit={submitReview}
            className={styles["product-reviews-modal__form"]}
          >
            <textarea
              // value={reviewText}
              onChange={(e) =>
                setReviewText((e.target as HTMLTextAreaElement).value)
              }
              value={reviewText}
              className={styles["product-reviews-modal__text-area"]}
              placeholder="Mời bạn chia sẻ một số cảm nhận về sản phẩm..."
              cols={60}
              rows={5}
            />
            <div
              className={`${styles["product-reviews-modal__upload-file"]} flex-vt-ct`}
            >
              <label className="flex-vt-ct" htmlFor="photo">
                <AiFillCamera /> Gửi hình chụp thật tế.
              </label>
              <input
                ref={fileRef}
                type="file"
                id="photo"
                accept="image/*"
                className={`${styles["product-reviews-modal__input-file"]}`}
              />
            </div>

            {!user && !Cookies.get(JWTKEY) ? (
              <div className={styles["product-reviews-modal__user-login"]}>
                <p>Please login first.</p>
                <Link state={{ prevPath: pathname }} to="/login">
                  Login Here
                </Link>
              </div>
            ) : error ? (
              <p className={styles["product-reviews-modal__err-msg"]}>
                {error}
              </p>
            ) : (
              <BtnSubmit
                isLoading={isLoading}
                isSuccess={isSuccess}
                text={isLoading ? "Submitting..." : "Gửi đánh giá"}
              />
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default React.memo(ProductReviewRating);
