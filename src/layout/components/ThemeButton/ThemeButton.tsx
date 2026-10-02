import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

// Context
import { useTheme } from "../../../context/themeContext";

// Styles
import styles from "./style.module.css";

// Types
type ThemeButtonProps = {
  isHidden: boolean;
};

type CSSVariables = React.CSSProperties & {
  '--size'?: string;
};

const ThemeButton = ({ isHidden }: ThemeButtonProps) => {
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === "light";

  return (
    <div className={clsx(styles.themeButton, isHidden && styles.hidden)}>
      {!isHidden && <span>Modo {theme}</span>}

      <button
        onClick={toggleTheme}
        aria-label={`Cambiar a modo ${isLight ? "oscuro" : "claro"}`}
        style={{ "--size": "20px" } as CSSVariables}
        className={styles.toggleButton}
      >
        <motion.span
          className={styles.toggleCircle}
          animate={{
            x: isLight ? -3 : 12,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          {isLight ? <Sun /> : <Moon />}
        </motion.span>
      </button>
    </div>
  );
};

export { ThemeButton };