import clsx from 'clsx';
import { NotificationItem } from '../../components/NotificationItem/NotificationItem';
import { useNotification } from '../../context/notificationsContext';
import styles from './style.module.css';

const Notification = ({ show }: { show: boolean }) => {
    const { saved, remove } = useNotification();
    return (
        <div className={clsx(styles.listNotifi, {
            [styles.show]: show
        })}>
            {saved.map(noti => (
                <NotificationItem handle={() => remove(noti)} key={noti.id} {...noti} />
            ))}
        </div>
    );
};

export { Notification }