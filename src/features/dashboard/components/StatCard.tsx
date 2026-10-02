import type { DashboardStat } from "../types";

// Components
import { Card } from "../../../components/Card/Card";
import { CircularProgress } from "../../../components/CircularProgress/CircularProgress";
import { StatDetails } from "./StatDetails";

// Styles
import styles from "../style.module.css";
import { useNavigate } from "react-router-dom";

const totalLabelByTitle: Partial<Record<DashboardStat["title"], string>> = {
  Proyectos: "Activos",
  Notas: "Guardadas",
  Roadmaps: "Planes",
};

type StatCardProps = {
  progress?: number;
  stat: DashboardStat;
  url?: string;
};

const StatCard = ({ progress, stat, url }: StatCardProps) => {
  const navigate = useNavigate();
  const Icon = stat.icon;
  const totalLabel = totalLabelByTitle[stat.title] ?? "Total";

  return (
    <Card className={styles.card} data-stat={stat.title.toLowerCase()} onClick={() => url && navigate(url)}>
      <div className={styles.cardMain}>
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <div className={styles.icon}>
              <Icon size={22} strokeWidth={2} />
            </div>
            <span className={styles.title}>{stat.title}</span>
          </div>

          <div className={styles.totalBlock}>
            <strong className={styles.total}>{stat.total}</strong>
            <span className={styles.totalLabel}>{totalLabel}</span>
          </div>
        </div>

        {progress !== undefined && (
          <div className={styles.cardProgress}>
            <CircularProgress size={120} strokeWidth={8} progress={progress} />
          </div>
        )}
      </div>

      <StatDetails details={stat.details} />
    </Card>
  );
};

export { StatCard };
