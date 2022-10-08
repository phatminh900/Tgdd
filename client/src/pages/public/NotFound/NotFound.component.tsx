import React, { useEffect } from "react";
import NotFoundImg from "../../../assets/imgs/404.png";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";
const NotFound = () => {
  useEffect(() => {
    document.title = "404 Page Not Found.";
  }, []);
  return (
    <div>
      <div className={`${styles["not-found"]} flex-both-ct`}>
        <img src={NotFoundImg} alt="Not found img" />
        <div className={styles["navigate-back-box"]}>
          <h2>Page Not Found</h2>
          <div>
            <Link to="/">Go Back to Home.</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { NotFound };
