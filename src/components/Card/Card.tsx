import type { ReactNode, HTMLAttributes } from "react";
// Style
import styles from "./style.module.css";

type CardProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div className={`${styles.card} ${className ?? ""}`}{...props}>
      {children}
    </div>
  );
};

export { Card };
