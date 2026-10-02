// *Styles*
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import styles from './style.module.css';

type TooltipProps = {
    style?: React.CSSProperties;
    children: React.ReactNode;
    show?: boolean;
    /**
     * Badge siempre visible y en el flujo (usa la clase .static del CSS).
     * Ideal para prioridades, status y etiquetas; sin esto se comporta
     * como tooltip flotante (position: absolute).
     */
    inline?: boolean;
    variant?: 'success' | 'error' | 'warning' | 'primary' | 'secondary' | 'info';
    position?: {
        top?: number | string;
        left?: number | string;
        bottom?: number | string;
        right?: number | string;
    };
    ref?: React.RefObject<HTMLDivElement | null>;
};

export type TooltipVariant = TooltipProps['variant'];

const Tooltip = ({
    children,
    position,
    show = true,
    inline = false,
    variant = 'primary',
    ref,
    style,
}: TooltipProps) => {
    const defaultPosition = {
        top: 'auto',
        left: 'auto',
        bottom: 'auto',
        right: 'auto',
    };

    position = {
        ...defaultPosition,
        ...position,
    };

    const cssRules: React.CSSProperties = {
        top: position.top,
        left: position.left,
        bottom: position.bottom,
        right: position.right,
        ...style,
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    ref={ref}
                    style={cssRules}
                    className={clsx(styles.tooltip, styles[variant], { [styles.static]: inline })}
                    initial={{ opacity: 1 , y: -10 }}
                    animate={{  y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: .15 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export { Tooltip };