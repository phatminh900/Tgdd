import useWindowDimensions from "hooks/useWindowDimensions";
import React, { useCallback, useEffect, useState } from "react";

const useSliderHook = (sliderState: {
  isOpenModal: boolean | undefined;
  maxSlideLength: number;
  onToggleModal?: () => void;
  autoScroll?: boolean;
  currentSlideNumber?: number;
  onSetCurrentSlideNumber?: (number: number) => void;
}) => {
  const { width } = useWindowDimensions();
  const [currentSlide, setCurrentSlide] = useState(
    sliderState.currentSlideNumber || 0
  );
  const nextSlide = useCallback(() => {
    if (
      sliderState.currentSlideNumber === currentSlide + 1 &&
      sliderState.onSetCurrentSlideNumber
    ) {
      setCurrentSlide((prev) => 0);
      return sliderState.onSetCurrentSlideNumber(0);
    }

    // i
    if (sliderState.onSetCurrentSlideNumber) {
      setCurrentSlide((prev) => prev + 1);
      return sliderState.onSetCurrentSlideNumber(currentSlide + 1);
    }

    if (sliderState.maxSlideLength === currentSlide + 1)
      return setCurrentSlide(0);

    setCurrentSlide((prevSlide) => ++prevSlide);
  }, [sliderState, currentSlide]);

  const prevSlide = useCallback(() => {
    if (
      sliderState.currentSlideNumber === 0 &&
      sliderState.onSetCurrentSlideNumber
    ) {
      setCurrentSlide(sliderState.maxSlideLength - 1);
      return sliderState.onSetCurrentSlideNumber(
        sliderState.maxSlideLength - 1
      );
    }

    if (sliderState.onSetCurrentSlideNumber) {
      setCurrentSlide((prev) => prev - 1);
      return sliderState.onSetCurrentSlideNumber(currentSlide - 1);
    }
    if (currentSlide === 0)
      return setCurrentSlide(sliderState.maxSlideLength - 1);
    setCurrentSlide((prevSlide) => --prevSlide);
  }, [sliderState, currentSlide]);

  const gotoSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = +(e.target as HTMLElement).closest("button")!.dataset.index!;
    setCurrentSlide(index);
  };

  // const maxSlideLength = slides.length;
  // auto scroll on small screen devices
  useEffect(() => {
    if (width <= 1200 && sliderState.autoScroll) {
      const timer = setInterval(nextSlide, 2000);
      return () => clearInterval(timer);
    }
  }, [width, nextSlide, sliderState.autoScroll]);
  // keyboard
  useEffect(() => {
    if (sliderState.isOpenModal && sliderState.onToggleModal) {
      const handleSlide = (e: KeyboardEvent) => {
        e.key === "Escape" &&
          sliderState.onToggleModal &&
          sliderState.onToggleModal();
        e.key === "ArrowRight" && nextSlide();
        e.key === "ArrowLeft" && prevSlide();
      };
      document.body.addEventListener("keyup", handleSlide);
      return () => document.body.removeEventListener("keyup", handleSlide);
    }
  }, [nextSlide, prevSlide, sliderState]);

  return { currentSlide, nextSlide, prevSlide, gotoSlide };
};

export default useSliderHook;
