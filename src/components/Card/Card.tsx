import type { ReactNode } from "react";

import clsx from "clsx";
import { motion, type HTMLMotionProps } from "framer-motion";

// *Style*

import styles from "./style.module.css";

type CardProps = {
  children: ReactNode;
} & HTMLMotionProps<"div">;

const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <motion.div
      className={clsx(styles.card, className)}
      initial={{
        y: 40,
        scale: 0.95,
      }}
      whileHover={{
        y: -10,
        transition: {
          duration: .3,
          ease: "easeOut",
        },
      }}
      animate={{
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export { Card };
