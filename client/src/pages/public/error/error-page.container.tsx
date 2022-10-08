import React from "react";
import { useRouteError } from "react-router-dom";
import styles from "./error-page.module.scss";
const ErrorPage = () => {
  const error = useRouteError() as { message: string };
  console.error(error);

  return (
    <div className={styles["error-page"]}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error && <i>{error.message}</i>}</p>
    </div>
  );
};

export default ErrorPage;
