import React from "react";
import { Footer, Header } from "components";
import { Outlet } from "react-router-dom";
import styles from "./shared-layout.module.scss";
const SharedLayout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SharedLayout;
