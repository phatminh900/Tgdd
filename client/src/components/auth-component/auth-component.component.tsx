import React from "react";
import { Form } from "react-router-dom";
import AuthImg from "../../assets/imgs/login-signup-img/i1.png";
import styles from "./auth-component.module.scss";

interface AuthComponentProps {
  error: string | null;
  children: React.ReactNode;
  isSuccess?: boolean;
  successMessage?: string;
}
const AuthComponent = ({
  error,
  isSuccess,
  children,
  successMessage,
}: AuthComponentProps) => {
  return (
    <div className={styles.auth}>
      <img src={AuthImg} alt="address" />
      {error && (
        <div className={`${styles.error} error`}>
          {error || "User or password incorrect!"}
        </div>
      )}
      {successMessage && isSuccess && (
        <div className={styles.success}>{successMessage}</div>
      )}
      <Form className={styles.form} method="post">
        {children}
      </Form>
    </div>
  );
};

export default AuthComponent;
