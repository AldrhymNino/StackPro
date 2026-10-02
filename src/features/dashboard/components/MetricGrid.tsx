import type { DashboardMetric } from "../types";

// Components
import { DashboardSection } from "./DashboardSection";

// Styles
import styles from "../style.module.css";

type MetricGridProps = {
  description?: string;
  metrics: DashboardMetric[];
  title: string;
};

const MetricGrid = ({ description, metrics, title }: MetricGridProps) => {
  return (
    <DashboardSection description={description} title={title}>
      <div className={styles.metricsGrid}>
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <article
              className={styles.metricCard}
              data-tone={metric.tone ?? "primary"}
              key={metric.id}
            >
              <div className={styles.metricHeader}>
                {Icon && (
                  <span className={styles.metricIcon}>
                    <Icon size={18} />
                  </span>
                )}
                {metric.trend && (
                  <span className={styles.metricTrend}>{metric.trend}</span>
                )}
              </div>

              <strong className={styles.metricValue}>{metric.value}</strong>
              <span className={styles.metricLabel}>{metric.label}</span>
              {metric.helper && (
                <p className={styles.metricHelper}>{metric.helper}</p>
              )}
            </article>
          );
        })}
      </div>
    </DashboardSection>
  );
};

export { MetricGrid };
