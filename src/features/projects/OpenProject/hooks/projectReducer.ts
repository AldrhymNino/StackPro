// Utils
import { createActivity } from "../../../../utils/CreateActivity";

// Types
import type { Priority, Project, Task } from "../../../../types/Project";
import type {
  DashboardActivityAction,
  DashboardActivityType,
  DashboardTone,
} from "../../../dashboard/types";

/*
 * projectReducer — el "cerebro" de la edición del proyecto abierto.
 *
 * Cada acción representa un cambio que hace el usuario en la vista
 * (renombrar, añadir tarea, cambiar prioridad...) y devuelve una NUEVA
 * copia del proyecto con ese cambio aplicado. Nunca muta el estado
 * original (inmutabilidad) — así React detecta los cambios y el
 * autosave del hook puede persistirlos.
 */

/*
 * Acciones posibles. Se disparan con dispatchProject(...) desde
 * cualquier componente de la vista a través del contexto.
 */
export type ProjectAction =
  | { type: "set-title"; value: string }
  | { type: "set-description"; value: string }
  | { type: "task-add"; value: Task }
  | { type: "task-delete"; id: string }
  | { type: "task-edit"; id: string; value: string }
  | { type: "task-toggle"; id: string }
  | { type: "set-priority"; value: Priority }
  | { type: "set-priority-task"; value: Priority; id: string }
  | { type: "set-deadline"; value: string | null };

/*
 * El status del proyecto NO se guarda: se calcula solo a partir de
 * sus tareas.
 *   - Sin tareas          → "pending"
 *   - Todas completadas   → "done"
 *   - Algunas completadas → "progress"
 */
const getProjectStatus = (tasks: Task[]): Project["status"] => {
  if (tasks.length === 0) return "pending";

  const completed = tasks.filter((task) => task.done).length;

  if (completed === tasks.length) return "done";
  if (completed > 0) return "progress";

  return "pending";
};

/* Reemplaza las tareas y recalcula status + updatedAt */
const updateProjectTasks = (state: Project, tasks: Task[]): Project => {
  return {
    ...state,
    tasks,
    status: getProjectStatus(tasks),
    updatedAt: new Date().toISOString(),
  };
};

/* Marca el proyecto como editado (actualiza su fecha de modificación) */
const touchProject = (state: Project): Project => ({
  ...state,
  updatedAt: new Date().toISOString(),
});

// Crea el activity
const createActivityLog = (
  operation: DashboardActivityAction,
  entity: DashboardActivityType,
  title: string,
  description: string,
  tone: DashboardTone,
  idProject: string,
) => {
  const url = `/dashboard/projects/${idProject}`;
  const activity = createActivity(
    operation,
    entity,
    title,
    description,
    "Project",
    url,
    tone,
  );
  const id = crypto.randomUUID();
  const timestamp = new Date().toISOString();
  return {
    id,
    timestamp,
    ...activity,
  };
};

// Reducer
export const projectReducer = (
  state: Project | null,
  action: ProjectAction,
): Project | null => {
  if (!state) return null;
  switch (action.type) {
    /* --- Datos generales --- */
    case "set-title": {
      const { value } = action;
      const oldTitle = state.title;

      if(value === oldTitle)
        return state;

      const length = oldTitle.length;

      const operation: DashboardActivityAction = !length ? 'created' : 'updated'
      const changueName = !length ? `"${value}"` : `"${state.title}" -> "${value}"`;
      const title = !length ? 'Titulo Creado' : 'Titulo Cambiado';
      const message = !length ? `Se ha creado el titulo ${changueName}` : `Se ha cambiado el titulo ${changueName}`
      const tone: DashboardTone = !length ? 'success' : 'info'

      const activity = createActivityLog(
        operation,
        "project",
        title,
        message,
        tone,
        state.id,
      );

      return touchProject({
        ...state,
        title: value,
        activityLog: [activity, ...state.activityLog],
      });
    }

    case "set-description": {
      const { value: description } = action;
      const oldDescription = state.description;

      if (description === oldDescription)
        return state;


      const title = !oldDescription ? 'Descripción Creada' : 'Descripción Cambiada' ;
      const tone: DashboardTone = !oldDescription ? 'success' : 'info';

      const activity = createActivityLog(
        "updated",
        "project",
        title,
        description,
        tone,
        state.id,
      );

      return touchProject({
        ...state,
        description,
        activityLog: [activity, ...state.activityLog],
      });
    }

    case "set-deadline": {
      const { value: deadline } = action;
      const oldDeadline = state.deadline;

      if(deadline === oldDeadline)
        return state;

      const descriptionPart1 = !oldDeadline ? 'Se ha creado fecha limite ' : 'Se ha cambiado deadline ';
      const descriptionPart2 = !oldDeadline ? deadline &&  new Date(deadline).toLocaleDateString() : deadline && `"${new Date(deadline).toLocaleDateString()}" -> "${new Date(oldDeadline).toLocaleDateString()}"`;
      const description = descriptionPart1 + descriptionPart2;
      const title = !oldDeadline ? 'Fecha Límite Creada'  : 'Fecha Límite Cambiada';
      const tone:DashboardTone = !oldDeadline ? 'success' : 'info';


      const activity = createActivityLog(
        "updated",
        "project",
        title,
        description,
        tone,
        state.id,
      );

      return touchProject({
        ...state,
        deadline,
        activityLog: [activity, ...state.activityLog],
      });
    }

    case "set-priority": {
      const { value: priority } = action;
      const oldPriority = state.priority;

      if(priority === oldPriority)
        return state;

      const activity = createActivityLog(
        "updated",
        "project",
        "Prioridad Cambiada",
        `Se ha cambiado la priodidad "${state.priority}" -> "${priority}" `,
        "info",
        state.id,
      );

      return touchProject({
        ...state,
        priority,
        activityLog: [activity, ...state.activityLog],
      });
    }

    /* --- Tareas --- */

    case "task-add": {
      const { value: task } = action;
      const activity = createActivityLog(
        "created",
        "task",
        "Tarea Agregada",
        `Se agrego Tarea "${task.title}"`,
        "success",
        state.id,
      );


      const copyState = {
        ...state,
        activityLog: [activity, ...state.activityLog],
      };

      return updateProjectTasks(copyState, [task, ...state.tasks]);
    }

    case "task-delete": {
      const { id } = action;

      const titleTask = state.tasks.find((task) => id === task.id)?.title;

      const activity = createActivityLog(
        "deleted",
        "task",
        "Tarea Eliminada",
        `Se elimino la tarea "${titleTask}"`,
        "error",
        state.id,
      );

      const copyState = {
        ...state,
        activityLog: [activity, ...state.activityLog],
      };

      return updateProjectTasks(
        copyState,
        state.tasks.filter((task) => task.id !== id),
      );
    }

    case "task-edit": {
      const { id, value: title } = action;

      const oldTitle = state.tasks.find((task) => id === task.id)?.title;

      if(oldTitle === title)
        return state

      const activity = createActivityLog(
        "updated",
        "task",
        "Tarea Editada",
        `Se Editó la tarea "${oldTitle}" -> "${title}"`,
        "info",
        state.id,
      );

      const copyState = {
        ...state,
        activityLog: [activity, ...state.activityLog],
      };

      return touchProject({
        ...copyState,
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, title } : task,
        ),
      });
    }

    case "task-toggle": {
      const { id } = action;

      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      );

      const task = updatedTasks.find((task) => task.id === id);

      const statusTask = task?.done;

      const statusText = statusTask ? "Completada" : "Por Completar";

      const operation: DashboardActivityAction = statusTask
        ? "completed"
        : "status_changed";

      const tone: DashboardTone = statusTask ? "success" : "warning";

      const description = statusTask
        ? `Se completo la tarea "${task?.title}"`
        : `Se cambio el estado de la tarea "${task?.title}"`;

      const activity = createActivityLog(
        operation,
        "task",
        `Tarea ${statusText}`,
        description,
        tone,
        state.id,
      );

      const copyState = {
        ...state,
        activityLog: [activity, ...state.activityLog],
      };

      const update = updateProjectTasks(copyState, updatedTasks);

      return update;
    }

    case "set-priority-task": {
      const { value: priority, id } = action;
      const oldPriority = state.tasks.find(task => task.id === id)?.priority;


      if(oldPriority === priority) 
        return state

      return touchProject({
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, priority } : task,
        ),
      });
    }

    /* --- ActivityLog --- */

    default:
      return state;
  }
};
