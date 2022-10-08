import React from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import styles from "./slider.module.scss";
import Slides from "./slides/slides.component";
import useSliderHook from "./slider.hook";
import { Link } from "react-router-dom";

interface SliderProps {
  maxSlideLength: number;
  slides?: string[];
  onToggleModal?: (e?: React.MouseEvent) => void;
  isOpenModal?: boolean;
  className: string;
  usingDots?: boolean;
  usingImgs?: boolean;
  isLink?: boolean;
  links?: {
    id: number;
    path: string;
    slide: string | string[];
  }[];
  currentSlideNumber?: number;
  onSetCurrentSlideNumber?: (number: number) => void;
  autoScroll?: boolean;
}
const Slider = ({
  maxSlideLength,
  slides,
  usingDots,
  className,
  usingImgs,
  isOpenModal,
  onToggleModal,
  currentSlideNumber,
  onSetCurrentSlideNumber,
  isLink = false,
  autoScroll,
  links,
}: SliderProps) => {
  const { currentSlide, nextSlide, prevSlide, gotoSlide } = useSliderHook({
    isOpenModal,
    maxSlideLength,
    onToggleModal,
    autoScroll,
    currentSlideNumber,
    onSetCurrentSlideNumber,
  });
  const SlidesEl = (i: number, slide: string | string[]) => (
    <Slides
      onToggleModal={onToggleModal}
      currentSlide={currentSlide}
      index={i}
      key={uuidv4()}
      slide={slide}
    />
  );
  return (
    <>
      <div className={`${styles.slider} ${className}`}>
        {isLink &&
          links &&
          links.map((link, i) => (
            <div
              className={styles["slide-box"]}
              style={{ translate: `${(i - currentSlide) * 100}%` }}
              key={link.id}
            >
              <Link to={link.path}>{SlidesEl(i, link.slide)}</Link>
            </div>
          ))}
        {slides &&
          slides.map((slide, i) => (
            <div
              className={styles["slide-box"]}
              style={{ translate: `${(i - currentSlide) * 100}%` }}
              key={slide}
            >
              {SlidesEl(i, slide)}
            </div>
          ))}
        <button
          className={`${styles.btn} ${styles["btn--left"]} center-vt-absolute`}
          onClick={prevSlide}
        >
          <AiOutlineArrowLeft />
        </button>
        <button
          className={`${styles.btn} ${styles["btn--right"]}    center-vt-absolute`}
          onClick={nextSlide}
        >
          <AiOutlineArrowRight />
        </button>

        {usingDots && (
          <div
            className={`${styles.dots} flex gap-4px center-hr-left-absolute `}
          >
            {links &&
              links.map((_, index) => (
                <button
                  onClick={gotoSlide}
                  key={uuidv4()}
                  data-index={index}
                  className={`${styles.dot} ${
                    currentSlide === index ? styles.active : ""
                  }`}
                >
                  &nbsp;
                </button>
              ))}
          </div>
        )}
      </div>
      {usingImgs && (
        <ul className={`${styles["list-slides-img"]} `}>
          {slides &&
            slides.map((slide, index) => (
              <li
                key={uuidv4()}
                className={`${styles.slide} ${
                  currentSlide === index ? styles.active : ""
                }`}
              >
                <button
                  className="flex-vt-ct"
                  onClick={gotoSlide}
                  data-index={index}
                >
                  <img src={slide} alt="Iphone hightlight" />
                </button>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export default React.memo(Slider);
