import { Search as SearchIcon } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

import clsx from "clsx";

import styles from "./style.module.css";

type SearchProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Search = ({ className, ...attr }: SearchProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className={clsx(styles.search, className)}
      animate={{
        borderColor: isFocused
          ? "color-mix(in srgb, var(--info) 45%, var(--border))"
          : "var(--border)",
        boxShadow: isFocused
          ? "0 0 0 3px color-mix(in srgb, var(--info) 8%, transparent)"
          : "0 0 0 0 transparent",
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
    >
      <motion.div
        className={styles.icon}
        animate={{
          color: isFocused
            ? "var(--info)"
            : "var(--text-muted)",
          x: isFocused ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        <SearchIcon />
      </motion.div>

      <input
        {...attr}
        type="search"
        placeholder={attr.placeholder ?? "Search..."}
        onFocus={(e) => {
          setIsFocused(true);
          attr.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          attr.onBlur?.(e);
        }}
      />
    </motion.div>
  );
};

export { Search };