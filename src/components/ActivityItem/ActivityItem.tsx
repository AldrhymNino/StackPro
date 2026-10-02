import { Link } from "react-router-dom";
import { Check, Info, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";

import type {
  DashboardActivity,
  DashboardActivityAction,
} from "../../features/dashboard/types";

import styles from "./style.module.css";
import { timestampToDate } from "../../utils/timeStampToDate";

const activityIcons: Record<DashboardActivityAction, typeof Info> = {
  created: Plus,
  updated: Pencil,
  deleted: Trash2,
  completed: Check,
  status_changed: RefreshCw,
};

type ActivityLogItemProps = {
  activity: DashboardActivity;
};

const ActivityLogItem = ({ activity }: ActivityLogItemProps) => {
  const Icon = activityIcons[activity.action] ?? Info;

  return (
    <article
      className={styles.item}
      style={{
        borderLeftColor: `var(--${activity.tone})`,
      }}
    >
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <span className={styles.icon} data-type={activity.type}>
            <Icon
              size={17}
              fill={`var(--${activity.tone}-soft)`}
              stroke={`var(--${activity.tone})`}
            />
          </span>

          <strong style={{ color: `var(--${activity.tone})` }}>
            {activity.title}
          </strong>

          <time>{timestampToDate(activity.timestamp)}</time>
        </div>

        <p>{activity.description}</p>

        <Link
          className={styles.meta}
          style={{
            color: `var(--${activity.tone})`,
          }}
          to={activity.url}
        >
          {activity.meta}
        </Link>
      </div>
    </article>
  );
};

export { ActivityLogItem };
