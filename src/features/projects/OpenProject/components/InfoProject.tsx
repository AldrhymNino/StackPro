import clsx from "clsx";

// Hooks
import { useOpenProjectContext } from "../../context/useOpenProjectContext";

// Components
import { Progressbar } from "../../../../components/Progressbar/Progressbar";

// *Style*
import styles from "../style.module.css";

const InfoProject = () => {

  const { project, progress, total, completed } = useOpenProjectContext();

  if (!project) return null;

  const { deadline } = project;

  const remainingDays = (deadline: string) => {
    const today = new Date();
    const deadLine = new Date(deadline);

    today.setHours(0, 0, 0, 0);
    deadLine.setHours(0, 0, 0, 0);

    const difference = deadLine.getTime() - today.getTime();
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

    if (days === 0) return "Vence hoy";
    if (days === 1) return "Falta 1 día";
    if (days > 1) return `Faltan ${days} días`;

    if (days === -1) return "Venció hace 1 día";
    return `Venció hace ${Math.abs(days)} días`;
  };

  return (
    <div className={styles.infoProject}>
      <div className={styles.sectionProgress}>
        <h6>Progreso del Proyecto</h6>
        <p className={styles.progressValue}>{progress}%</p>
        <Progressbar progress={progress} />
      </div>

      <div className={styles.sectionTask}>
        <h6>Tareas Completadas</h6>
        <p className={styles.taskValue}>
          {completed} / {total}
        </p>
      </div>

      <div className={styles.sectionDeadline}>
        <h6>Tiempo Limite</h6>

        <p
          className={clsx(styles.deadlineValue, {
            [styles.muted]: !deadline,
          })}
        >
          {deadline ? remainingDays(deadline) : "No definido"}
        </p>
      </div>

      <div className={styles.sectionTime}>
        <h6>Tiempo Estimado</h6>
        <p className={styles.timeValue}>{'18h 53min'}</p>
      </div>
    </div>
  );
};

export { InfoProject };
