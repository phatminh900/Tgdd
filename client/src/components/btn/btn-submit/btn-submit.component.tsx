import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import styles from "./btn-submit.module.scss";
const BtnSubmit = ({
  text,
  isLoading,
  isSuccess,
  className,
}: {
  text: string;
  isLoading: boolean;
  isSuccess: boolean;
  className?: string;
}) => {
  return (
    <button className={`${styles.btn} ${className}`} disabled={isSuccess}>
      {!isSuccess && !isLoading && text}
      {isLoading && text}
      {isSuccess && <BsCheckCircle />}
    </button>
  );
};

export default BtnSubmit;
