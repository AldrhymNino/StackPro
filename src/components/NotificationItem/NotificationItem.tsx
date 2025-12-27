import type { Notification } from '../../types/Notification';
import styles from './style.module.css';

type NotificationItemProps = Notification & {
    className?: string;
}

const NotificationItem = ({className, ...props}: NotificationItemProps) => {
    return (
        <div className={`${styles.notifi} ${className}`}>
            <h2>{props.entity.type}</h2>
            <h3 style={{
                color: `var(--${props.type})`
            }}>{props.title}</h3>
            <p>{props.message}</p>
        </div>
    );
}

export { NotificationItem }