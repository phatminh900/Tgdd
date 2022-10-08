import React from "react";
import styles from "./footer.module.scss";
const Footer = () => {
  return (
    <footer>
      <div className={styles["copyright-box"]}>
        <i className={styles.logo}></i>
        <p className={styles.copyright}>
          &copy; <a href="https://www.thegioididong.com/">Tgdd</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
