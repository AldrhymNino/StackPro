// Types
import type { Project } from "../../../../../types/Project";

// Router
import { useNavigate } from "react-router-dom";

// Components
import { Tooltip } from "../../../../../components/Tooltip/Tooltip";
import { Card } from "../../../../../components/Card/Card";
import { Progressbar } from "../../../../../components/Progressbar/Progressbar";
import { DateInfo } from "../../../../../components/DateInfo/DateInfo";

// Icons
import { CheckCircle, CheckCircle2, ClipboardList, ListTodo, Loader2, XCircle } from "lucide-react";

// Styles
import styles from "./style.module.css";

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
      <Tooltip variant={variant} show position={{ bottom: '10px', right: '10px' }}>
        {icon}
      </Tooltip>
      <header className={styles.header}>
        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.description}>{project.description || "Sin descripción"}</p>
      </header>

      <div className={styles.info}>
        <div className={styles.stat}>
          <ListTodo size={16} />
          <span>{totalTasks} tareas</span>
        </div>

        {project.deadline && (
          <div className={styles.stat}>
            <span>límite:</span>
            <DateInfo date={project.deadline} />
          </div>
        )}
      </div>

      <Progressbar list={project.tasks} />

      <footer className={styles.footer}>
        <div className={styles.progress}>
          <CheckCircle2 size={16} />
          <span>
            {completedTasks}/{totalTasks} completadas
          </span>
        </div>
        <DateInfo date={project.createdAt} />
      </footer>
    </Card>
  );
}
export { ProjectCard }
