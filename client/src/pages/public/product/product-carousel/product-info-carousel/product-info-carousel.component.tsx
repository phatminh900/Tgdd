import React from "react";
import Slider from "components/slider/slider.component";
import styles from "./product-info-carousel.module.scss";

import {
  IProductHighlightsImgState,
  IProductModalState,
} from "./../../product.interface";
interface ProductInfoSlideProps
  extends IProductModalState,
    IProductHighlightsImgState {
  slidesImgs: string[];
}
const ProductInfoSlide = ({
  isOpenModal,
  slidesImgs,
  currentHighlightsImgNumber,
  onToggleModal,
}: ProductInfoSlideProps) => {
  return (
    <div className={styles["product-info-slides"]}>
      {/* <div className={styles.slides}> */}
      <Slider
        currentSlideNumber={currentHighlightsImgNumber || 0}
        onToggleModal={onToggleModal}
        usingImgs={true}
        isOpenModal={isOpenModal}
        className={styles.slider}
        slides={slidesImgs}
        maxSlideLength={slidesImgs.length || 0}
      />
    </div>
  );
};

export default React.memo(ProductInfoSlide);
