import type { DashboardFocusItem } from "../types";

// Components
import { Progressbar } from "../../../components/Progressbar/Progressbar";
import { DashboardSection } from "./DashboardSection";

// Styles
import styles from "../style.module.css";

type FocusListProps = {
  description?: string;
  emptyText?: string;
  items: DashboardFocusItem[];
  title: string;
};

const FocusList = ({
  description,
  emptyText = "No hay prioridades pendientes.",
  items,
  title,
}: FocusListProps) => {
  return (
    <DashboardSection description={description} title={title}>
      {items.length === 0 ? (
        <p className={styles.emptyState}>{emptyText}</p>
      ) : (
        <div className={styles.focusGrid}>
          {items.map((item) => (
            <article
              className={styles.focusItem}
              data-tone={item.tone ?? "primary"}
              key={item.id}
            >
              <div className={styles.focusHeader}>
                <strong>{item.title}</strong>
                {item.meta && <span>{item.meta}</span>}
              </div>

              {item.description && <p>{item.description}</p>}

              {item.progress !== undefined && (
                <div className={styles.focusProgress}>
                  <Progressbar progress={item.progress} />
                  <strong>{item.progress}%</strong>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </DashboardSection>
  );
};

export { FocusList };
