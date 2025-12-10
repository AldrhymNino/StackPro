import type { ButtonHTMLAttributes, ReactNode } from 'react';

// Styles
import styles from './style.module.css';

// Utils
import clsx from 'clsx';

type btnProps = {
  children: ReactNode;
  variant?: 'icon' | 'primary' | 'primary-icon' | 'error';
  notHover?: boolean;
  ghost?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, variant, notHover, className, ghost, ...props }: btnProps) => {
  return (
    <button
      {...props}
      className={clsx(styles[variant as keyof typeof styles], className, styles.button, {
        [styles.notHover]: notHover,
        [styles.ghost]: ghost
      })}
    >
      {children}
    </button>
  );
};

export { Button };
