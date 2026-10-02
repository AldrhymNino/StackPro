import { motion } from "framer-motion";

// Styles
import styles from "./style.module.css";

// Type
type CheckboxProps = {
  id: string;
  checked: boolean;
  onChange: () => void;
};

const Checkbox = ({ id, checked, onChange }: CheckboxProps) => {
  return (
    <label className={styles.checkbox}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />

      <motion.span
        animate={{
          scale: checked ? 1 : 0,
          opacity: checked ? 1 : 0,
        }}
      >
        ✓
      </motion.span>
    </label>
  );
};

export { Checkbox };
