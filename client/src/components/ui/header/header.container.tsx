import React from "react";

import styles from "./header.module.scss";
import Navigation from "./navigation.component";
const Header = () => {
  return (
    <header className={styles.header}>
      <Navigation />
    </header>
  );
};

export default Header;
