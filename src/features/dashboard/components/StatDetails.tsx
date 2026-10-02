import type { DashboardStat } from "../types";

// Styles
import styles from "../style.module.css";

type StatDetailsProps = {
  details: DashboardStat["details"];
};

const StatDetails = ({ details }: StatDetailsProps) => {
  if (details.length === 0) return null;

  return (
    <div className={styles.details}>
      {details.map((detail, index) => {
        const isFeatured = index === 0;
        const className = isFeatured
          ? `${styles.detailItem} ${styles.featuredDetail}`
          : styles.detailItem;

        return (
          <div key={`${detail.label}-${index}`} className={className}>
            {isFeatured ? (
              <strong>{detail.label}</strong>
            ) : (
              <span>{detail.label}</span>
            )}
            <strong>{detail.value}</strong>
          </div>
        );
      })}
    </div>
  );
};

export { StatDetails };
