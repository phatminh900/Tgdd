import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./close-btn.module.scss";
interface CloseBtnProps {
  onClick: () => void;
  className?: string;
  text?: string;
}
const CloseBtn = ({ onClick, className, text }: CloseBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${styles["btn--close-modal"]}`}
    >
      <AiOutlineClose /> {text || "Close"}
    </button>
  );
};

export default CloseBtn;
