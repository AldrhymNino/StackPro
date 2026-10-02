import type {
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from 'react';

import clsx from 'clsx';

import styles from './style.module.css';

type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'icon';

type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'current';

type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  children?: ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  notHover?: boolean;

  style?: CSSProperties & {
    '--size'?: string;
  };
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  variant = 'solid',
  color = 'current',
  size = 'md',
  notHover = false,
  style,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      style={style}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        styles[color],
        {
          [styles.notHover]: notHover,
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export { Button };