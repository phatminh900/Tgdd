import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { InputProps } from "./input.component";
import styles from "./input.module.scss";
interface InputPasswordProps extends Omit<InputProps, "type"> {
  placeholder: string;
}
const InputPassword = ({
  value,
  label,
  id,
  placeholder,
  className,

  onChange,
}: InputPasswordProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  let content = (
    <input
      onChange={onChange}
      value={value}
      className={`${styles.input} ${className}`}
      type={isShowPassword ? "text" : "password"}
      id={id}
      name={label.toLowerCase()}
      placeholder={placeholder}
      required
      minLength={6}
    />
  );
  if (!onChange) {
    <input
      defaultValue={value}
      className={`${styles.input} ${className}`}
      type={isShowPassword ? "text" : "password"}
      id={id}
      name={label.toLowerCase()}
      placeholder={placeholder}
      required
      minLength={6}
    />;
  }
  return (
    <>
      {content}
      <button
        type="button"
        className={styles.showPassword}
        onClick={() => setIsShowPassword((prev) => !prev)}
      >
        {!isShowPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
      </button>
    </>
  );
};

export default InputPassword;
