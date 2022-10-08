import React from "react";
import InputPassword from "./input-password.component";
import styles from "./input.module.scss";
export interface InputProps {
  id: string;
  label: string;
  value: string | number;
  type: "email" | "password" | "text";
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
}
const Input = ({
  value,
  label,
  id,
  type,
  className,
  onChange,
  disable = false,
}: InputProps) => {
  let content =
    type === "password" ? (
      <InputPassword
        className={className}
        onChange={onChange}
        value={value}
        label={label}
        id={id}
        placeholder={label}
      />
    ) : (
      <input
        className={`${styles.input} ${className}`}
        type={type}
        onChange={onChange}
        name={label ? label.toLowerCase() : ""}
        value={value}
        id={id}
        disabled={disable}
        placeholder={label}
        required
      />
    );
  if (!onChange)
    content =
      type === "password" ? (
        <InputPassword
          className={className}
          value={value}
          label={label}
          id={id}
          placeholder={label}
        />
      ) : (
        <input
          className={`${styles.input} ${className} ${
            disable && styles.disable
          }`}
          type={type}
          name={label ? label.toLowerCase() : ""}
          defaultValue={value}
          id={id}
          placeholder={label}
          disabled={disable}
          required
        />
      );
  return (
    <>
      <div className={`${styles["form-row"]} flex gap-6px`}>
        {content}
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      </div>
    </>
  );
};

export default Input;
