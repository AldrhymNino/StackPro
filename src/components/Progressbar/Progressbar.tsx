import { motion } from "framer-motion";

// *Styles*

import styles from "./style.module.css";

type ProgressbarProps<T> = {
  list?: T[];
  progress?: number;
};

const Progressbar = <T extends { done: boolean }>({
  list,
  progress,
}: ProgressbarProps<T>) => {
  const calculatedProgress =
    progress ??
    (list
      ? list.length === 0
        ? 0
        : (list.filter((item) => item.done).length / list.length) * 100
      : 0);

  return (
    <div className={styles.progressBar}>
      <motion.div
        className={styles.progressFill}
        initial={{ width: 0 }}
        animate={{ width: `${calculatedProgress}%` }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      />
    </div>
  );
};

export { Progressbar };