// Icons
import { Filter, Plus } from "lucide-react";

// Context
import { useOpenProjectContext } from "../../context/useOpenProjectContext";

// Components
import { TaskItem } from "./TaskItem";
import { Button } from "../../../../components/Buttons/Buttons";

// Styles
import styles from "../style.module.css";
import { Overlay } from "../../../../components/Overlay/Overlay";

/*
 * TasksMain — sección de tareas del proyecto abierto.
 * Header con acciones ("Nueva Tarea", filtro) + lista de <TaskItem />.
 */
const TasksMain = () => {
  const { project, currentTask, setCurrentTask } = useOpenProjectContext();

  if (!project) return null;

  const createTask = () => {
    setCurrentTask({type:'create-task'})
  }


  const { tasks } = project;

  return (
    <div className={styles.mainTask}>
      <header className={styles.headerMainTask}>
        <h2>Tareas</h2>
        <div className={styles.groupAction}>
          <Button
            variant="solid"
            color="primary"
            onClick={createTask}
          >
            <Plus />
            <span>Nueva Tarea</span>
          </Button>
          <Button variant="icon">
            <Filter />
          </Button>
        </div>
      </header>
      <div className={styles.taskList}>
        {currentTask && (
          <Overlay>
            <div style={{
              width: '100%',
              height: '100dvh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <TaskItem {...currentTask} isCreated />
            </div>
          </Overlay>
        )}
        {tasks.map((task) => (
          <TaskItem key={task.id} {...task} />
        ))}
      </div>
      
    </div>
  );
};

export { TasksMain };
