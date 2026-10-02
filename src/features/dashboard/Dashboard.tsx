import { Flame } from "lucide-react";

// Hooks
import { useDashboard } from "./hooks/useDashboard";


// Components
import { ActivityLog } from "./components/ActivityLog";
import { MetricGrid } from "./components/MetricGrid";
import { StatCard } from "./components/StatCard";

// Styles
import styles from "./style.module.css";
import { Button } from "../../components/Buttons/Buttons";
import { useState } from "react";
import { ModalFocusMode } from "./components/ModalFocusMode";

// Types
type ProgressByTitle = Partial<Record<string, number>>;

const Dashboard = () => {
  const { stats, projectProgress, roadmapProgress, metrics } = useDashboard();
  
  const [showModal, setShowModal] = useState<boolean>(false);

  const ProgressByTitle: ProgressByTitle = {
    Proyectos: projectProgress,
    Roadmaps: roadmapProgress,
  };


  return (
    <div className={styles.wrapper}>
      <ModalFocusMode show={showModal}  />
      <header className={styles.header}>
        <div>
          <span className={styles.kicker}>StackPro workspace</span>
          <h1>Dashboard</h1>
          <p className={styles.welcome}>
            Hola <b>Aldrhym</b>, bienvenido a tu espacio de trabajo.
          </p>
        </div>

        <Button variant="ghost"  className={styles.headerStatus} onClick={() => setShowModal(true)}>
          <Flame size={18} />
          <span>Modo enfoque</span>
        </Button>
      </header>

      <section className={styles.grid}>
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            stat={stat}
            progress={ProgressByTitle[stat.title]}
          />
        ))}
      </section>

      <div className={styles.dashboardBody}>
        <MetricGrid
          description="Ritmo, carga y deadlines del workspace."
          metrics={metrics}
          title="Métricas clave"
        />

        <ActivityLog
          description="Últimos movimientos relevantes dentro del workspace."
          title="Actividad reciente"
        />
      </div>
    </div>
  );
};

export { Dashboard };
