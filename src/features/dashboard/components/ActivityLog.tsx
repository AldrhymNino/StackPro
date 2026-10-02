import { Link } from "react-router-dom";

// Icons
import {
  Check,
  Info,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";

// Hooks
// import { useActivityLog } from "../../projects/OpenProject/hooks/useActivityLog";

// Types
import type { DashboardActivity, DashboardActivityAction } from "../types";

// Components
import { DashboardSection } from "./DashboardSection";

// Styles
import styles from "../style.module.css";

const activityIcons: Record<DashboardActivityAction, typeof Info> = {
  created: Plus,
  updated: Pencil,
  deleted: Trash2,
  completed: Check,
  status_changed: RefreshCw,
};

type ActivityLogProps = {
  description?: string;
  emptyText?: string;
  title: string;
};



const isSameDay = (date: Date, baseDate: Date) => {
  return date.toDateString() === baseDate.toDateString();
};

// Converts a timestamp to a human-readable date string
const timestampToDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const time = date.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isSameDay(date, today)) {
    return `Hoy, ${time}`;
  }

  if (isSameDay(date, yesterday)) {
    return `Ayer, ${time}`;
  }

  return date.toLocaleDateString("es-CO");
};


// Render Description
const renderDescription = (description: string, url: string) => {
  const match = description.match(/"([^"]+)"/);

  if (!match) {
    return description;
  }

  const quotedText = match[1];
  const start = match.index!;
  const end = start + match[0].length;

  return (
    <>
      {description.slice(0, start)}

      <Link style={{fontFamily: 'var(--font-mono)', marginLeft: '5px'}} to={url}>
        {quotedText}
      </Link>

      {description.slice(end)}
    </>
  );
};

const ActivityLog = ({
  description,
  emptyText = "Sin actividad reciente.",
  title,
}: ActivityLogProps) => {


  const activityLog: DashboardActivity[] = [];

  return (
    <DashboardSection
      description={description}
      title={title}
      className={styles.activityLog}
    >
      {activityLog.length === 0 ? (
        <p className={styles.emptyState}>{emptyText}</p>
      ) : (
        <ol className={styles.activityList}>
          {[...activityLog]
            .sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime(),
            )
            .map((item) => {
              const Icon = activityIcons[item.action] ?? Info;

              return (
                <li
                  className={styles.activityItem}
                  style={{ borderLeftColor: `var(--${item.tone})` }}
                  key={item.id}
                >
                  <span className={styles.activityIcon} data-type={item.type}>
                    <Icon size={17} fill={`var(--${item.tone}-soft)`} stroke={`var(--${item.tone})`} />
                  </span>

                  <div className={styles.activityContent}>
                    <div className={styles.activityTitleRow}>
                      <strong style={{ color: `var(--${item.tone})` }}>
                        {item.title}
                      </strong>
                      <time style={{fontFamily: 'var(--font-mono)' }}>{timestampToDate(item.timestamp)}</time>
                    </div>
                    <p>{renderDescription(item.description, item.url)}</p>
                  
                    <span style={{ color: `var(--${item.tone})`, fontFamily: 'var(--font-mono)' }}>
                      {item.meta}
                    </span>
                  </div> 
                </li>
              );
            })}
        </ol>
      )}
    </DashboardSection>
  );
};

export { ActivityLog };
