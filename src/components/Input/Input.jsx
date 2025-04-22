// utils
import clsx from "clsx";

// styles
import styles from "./input.module.css";

const Input = ({ type, placeholder, value, onChange, className}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={clsx(styles[className], styles["input"])}
    />
  );
};

export { Input };