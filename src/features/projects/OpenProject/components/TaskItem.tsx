// Icons
import { Circle, Trash2 } from "lucide-react";
import { useState } from "react";

// Context
import { useOpenProjectContext } from "../../context/useOpenProjectContext";

// Constants
import { priorities, priorityStyles } from "../constants/priority";

// Components
import { EditableText } from "../../../../components/EditableText/EditableText";
import { Checkbox } from "../../../../components/CheckBox/CheckBox";
import { Tooltip } from "../../../../components/Tooltip/Tooltip";
import { Button } from "../../../../components/Buttons/Buttons";
import { Dropdown } from "../../../../components/Dropdown/Dropdown";
import { DateInfo } from "../../../../components/DateInfo/DateInfo";

// Styles
import styles from "../style.module.css";

// Types
import type { Priority  } from "../../../../types/Project";

/* Distribución del badge de prioridad dentro del dropdown */
const priorityBadgeLayout: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 4,
  width: "100%",
};

type TaskItemProps = {
  title: string;
  id: string;
  done: boolean;
  priority: Priority;
  createdAt: string;
  isCreated?: boolean
};

/*
 * TaskItem — una fila de tarea:
 * checkbox + título editable + prioridad + fecha + botón eliminar.
 * Cada cambio se envía al reducer con dispatchProject() y el autosave
 * del hook lo persiste en el storage.
 */
const TaskItem = ({ title, id, priority, done, createdAt, isCreated = false }: TaskItemProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const { dispatchProject,  currentTask, setCurrentTask} = useOpenProjectContext();
  

  // Cambia la prioridad de ESTA tarea
  const handlePriority = (value: Priority) => {
    if(isCreated) {
      setCurrentTask({ type: "set-priority", value });
      return;
    }

    dispatchProject({ type: "set-priority", value });
  };

  // Guarda el nuevo título de la tarea
  const handleEdit = (value: string) => {
    if(isCreated) {
      setCurrentTask({type: 'set-title', value});
      return;
    }
    dispatchProject({ type: "task-edit", id, value });
  };

  // Marca / desmarca la tarea como completada
  const handleToggle = () => {
    if(isCreated) {
      setCurrentTask({type: 'status-change'})
      return;
    }
    dispatchProject({ type: "task-toggle", id });
  };

  // Elimina la tarea
  const handleDelete = () => {
    if(isCreated) {
      setCurrentTask({type: 'remove-current-task'})
      return;
    }
    dispatchProject({ type: "task-delete", id });
  }

  const onSave = (value: string) => {
    if (!currentTask)
      return;

    const newTask = {
      ...currentTask,
      title: value,
    }

    dispatchProject({type: 'task-add', value: newTask})
    setCurrentTask({type: 'remove-current-task'})
  }

  return (
    <div className={styles.task} style={{
      zIndex: isCreated ? 101 : 'initial'
    }}>
      <Checkbox id={id} checked={done} onChange={handleToggle} />
      <EditableText
        htmlFor={id}
        as="label"
        value={title}
        setValue={handleEdit}
        max={30}
        min={3}
        onSave={isCreated ? onSave : undefined}
        isEditingInitial={isCreated}
        notBlurEvent={true}
      />
      <Dropdown
        renderValue={(priority) => (
          <Tooltip
            style={priorityBadgeLayout}
            variant={priorityStyles[priority]}
            inline
          >
            <Circle
              size={8}
              fill={`var(--${priorityStyles[priority]})`}
              stroke={`var(--${priorityStyles[priority]})`}
            />
            <span style={{ color: `var(--${priorityStyles[priority]})` }}>
              {priority}
            </span>
          </Tooltip>
        )}
        position="left"
        options={priorities}
        value={priority}
        handlerOptions={{ showOptions, setShowOptions }}
        onClick={handlePriority}
      />
      <DateInfo date={createdAt} />

      <Button
        className={styles.deleteButton}
        variant="icon"
        color="error"
        onClick={handleDelete}
      >
        <Trash2 />
      </Button>
    </div>
  );
};

export { TaskItem };
