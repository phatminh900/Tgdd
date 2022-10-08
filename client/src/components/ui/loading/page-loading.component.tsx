import React from "react";
import { BiLoader } from "react-icons/bi";
import styles from "./page-loading.module.scss";
const PageLoading = () => {
  return (
    <div className={`${styles.loading} flex-both-ct`}>
      <BiLoader />
    </div>
  );
};

export default PageLoading;
