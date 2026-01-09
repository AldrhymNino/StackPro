import { X } from 'lucide-react';
import type { Notification } from '../../types/Notification';
import { Button } from '../Buttons/Buttons';
import styles from './style.module.css';

type NotificationItemProps = Notification & {
    className?: string;
    handle: () => void;
}

const NotificationItem = ({className, handle, ...props}: NotificationItemProps) => {
    return (
        <div className={`${styles.notifi} ${className}`}>
            <h2>{props.entity.type}</h2>
            <h3 style={{
                color: `var(--${props.type})`
            }}>{props.title}</h3>
            <p>{props.message}</p>
            <Button onClick={handle} variant='icon' style={{
                    background: 'transparent',
                    color: 'var(--error)',
                    position: 'absolute',
                    top: '3px',
                    right: '3px',
                    zIndex: 100
                }}>
                <X />
            </Button>
        </div>
    );
}

export { NotificationItem }