import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

// *Style*

import styles from "./style.module.css";

// *Type*

import type {
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";

type DropDownProperties<T extends string> = {
  value: T;
  options: T[];
  handlerOptions: handlerOptions;
  onClick: (op: T) => void;
  position?: "top" | "left" | "bottom" | "right";

  renderValue?: (value: T) => ReactNode;
  renderOption?: (value: T) => ReactNode;
};

type handlerOptions = {
  showOptions: boolean;
  setShowOptions: Dispatch<SetStateAction<boolean>>;
};

type DropDownOptionProperties<T extends string> = {
  value: T;
  onClick: (op: T) => void;
  renderOption?: (value: T) => ReactNode;
};

const DropDownOption = <T extends string>({
  value,
  onClick,
  renderOption,
}: DropDownOptionProperties<T>) => {
  return (
    <div
      onClick={() => onClick(value)}
      className={styles.dropDownOption}
    >
      {renderOption ? renderOption(value) : value}
    </div>
  );
};

const Dropdown = <T extends string>({
  value,
  options,
  handlerOptions,
  onClick,
  position = "bottom",
  renderValue,
  renderOption,
}: DropDownProperties<T>) => {
  const { showOptions, setShowOptions } = handlerOptions;

  const handlerDropOption = (op: T) => {
    setShowOptions(false);
    onClick(op);
  };

  return (
    <div className={styles.dropDown}>
      <button
        type="button"
        onClick={() => setShowOptions(!showOptions)}
        onBlur={() => setShowOptions(false)}
      >
        {renderValue ? renderValue(value) : value}
      </button>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            className={clsx(
              styles.dropDownOptions,
              styles[position]
            )}
            initial={{
              opacity: 0,
              translateY: -10,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            exit={{
              opacity: 0,
              translateY: -10,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {options.map((op) => (
              <DropDownOption
                onClick={handlerDropOption}
                key={op}
                value={op}
                renderOption={renderOption}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Dropdown };