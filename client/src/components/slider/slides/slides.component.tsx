import React from "react";
import styles from "./slides.module.scss";
interface ISlidesProps {
  index: number;
  currentSlide: number;
  onToggleModal?: () => void;
  slide: string | string[];
}
const Slides = ({
  onToggleModal,
  slide,
  index,

  currentSlide,
}: ISlidesProps) => {
  return (
    <div onClick={onToggleModal} className={`${styles.slide} slide`}>
      {typeof slide === "string" ? (
        <img src={slide} alt="Slider" />
      ) : (
        <img srcSet={`${slide[0]} 1x,${slide[1]} 2x`} alt="Slider" />
      )}
    </div>
  );
};

export default React.memo(Slides);
