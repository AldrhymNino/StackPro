// Styles
import clsx from 'clsx';
import styles from './style.module.css';

type TooltipProps = {
    children: React.ReactNode;
    show?: boolean;
    variant?: 'success' | 'error' | 'warning' | 'primary' | 'secondary' | string; 
    position: {
        top?: number | string;
        left?: number | string;
        bottom?: number | string;
        right?: number | string;
    };
};

export type TooltipVariant = TooltipProps['variant'];

const Tooltip = ({ children, position, show, variant = 'primary' }: TooltipProps) => {
    const defaultPosition = { top: 'auto', left: 'auto', bottom: 'auto', right: 'auto' };

    position = { 
        ...defaultPosition, 
        ...position
    };

    const style: React.CSSProperties = {
        top: position.top,
        left: position.left,
        bottom: position.bottom,
        right: position.right
    };

    return (
        <div className={clsx(styles.Tooltip, styles[variant], {[styles.show]: show})} style={style}>
            {children}
        </div>
    );
};

export { Tooltip };
