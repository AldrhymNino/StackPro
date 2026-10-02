import clsx from "clsx";

// Icons
import { Bell } from "lucide-react";

// Components
// import { NotificationItem } from "../../components/NotificationItem/NotificationItem";
// import { useNotification } from "../../context/notificationContext";
import { Empty } from "../../components/Empty/Empty";

// styles
import styles from "./style.module.css";

type NotificationProps = {
  style?: React.CSSProperties & { "--margin"?: string };
  show: boolean;
};

const Notification = ({ style, show }: NotificationProps) => {
  return (
    <div
      className={clsx(styles.listNotifi, {
        [styles.show]: show,
      })}
      style={style}
    >
    
      <Empty text="No tienes notificaciones" icon={<Bell />} />
    </div>
  );
};

export { Notification };
