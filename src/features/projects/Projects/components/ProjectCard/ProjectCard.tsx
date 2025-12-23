// Types
import type { Project } from "../../../../../types/Project";

// Router
import { useNavigate } from "react-router-dom";

// Components
import { Tooltip } from "../../../../../components/Tooltip/Tooltip";

// Icons
import { CalendarDays, CheckCircle, CheckCircle2, ClipboardList, ListTodo, Loader2, XCircle } from "lucide-react";

// Styles
import styles from "./style.module.css";
import { Card } from "../../../../../components/Card/Card";

interface Props {
  project: Project;
}

// Variants
const variantOfStatus = {
  done: {
    variant: "success",
    icon: <CheckCircle size={18} />,
  },
  pending: {
    variant: "secondary",
    icon: <Loader2 size={18} />,
  },
  progress: {
    variant: "warning",
    icon: <ClipboardList size={18} />,
  },
  canceled: {
    variant: "error",
    icon: <XCircle size={18} />,
  },
} as const;

const ProjectCard = ({ project }: Props) => {
  const totalTasks = project.tasks?.length || 0;
  const completedTasks = project.tasks?.filter((t) => t.done).length || 0;
  const navigate = useNavigate();

  const { variant, icon } = variantOfStatus[project.status] ?? variantOfStatus.pending;


  return (
    <Card onClick={() => navigate(`/dashboard/projects/${project.id}`)}>
      <Tooltip variant={variant} show position={{ top: '10px', right: '10px' }}>
        {icon}
      </Tooltip>
      <header>
        <h2>{project.title}</h2>
        <p className={styles.description}>{project.description || "Sin descripción"}</p>
      </header>

      <div className={styles.info}>
        <div className={styles.stat}>
          <ListTodo size={16} />
          <span>{totalTasks} tareas</span>
        </div>

        {project.deadline && (
          <div className={styles.stat}>
            <CalendarDays size={16} />
            <span>{new Date(project.deadline).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <footer>
        <div className={styles.progress}>
          <CheckCircle2 size={16} />
          <span>
            {completedTasks}/{totalTasks} completadas
          </span>
        </div>
        <small className={styles.date}>
          Creado el {new Date(project.createdAt).toLocaleDateString()}
        </small>
      </footer>
    </Card>
  );
};

export { ProjectCard }
