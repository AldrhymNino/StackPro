// Hooks
import { useEffect, useRef, useReducer  } from "react";
import { useProjectProgress } from "./useProjectProgress";
import { projectReducer, type ProjectAction } from "./projectReducer";
import { useProject } from "../../hooks/useProject";
import { useNavigate, useParams } from "react-router-dom";

// Type
import type { Project  } from "../../../../types/Project";
import { taskReducer } from "./taskReducer";


/*
 * useOpenProject — el cerebro de la vista "Proyecto abierto".
 *
 * 1. Toma el :id de la URL y busca el proyecto en el storage.
 * 2. Mantiene una COPIA editable del proyecto en un useReducer:
 *    el usuario edita ahí sin tocar el storage en cada tecla.
 * 3. Autosave: cada cambio se sincroniza con el storage (silencioso).
 * 4. ProjectProvider comparte todo esto con la vista vía contexto.
 */
const useOpenProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Storage global de proyectos (localStorage)
  const { updateProject, removeProject, projects, addProject } = useProject();

  const getProject: Project | null = projects.find(project => project.id === id) || null;

  const getNewProject: Project | null = (() => {
    const JSONproject = localStorage.getItem('newproject');
    localStorage.removeItem('newproject');
    return JSONproject ? JSON.parse(JSONproject) : null;
  })();

  const initialProject = (getProject || getNewProject);

  // Envoltorio del dispatch: marca que hay cambios en cuanto ocurre una acción
  const dispatchProject = (action: ProjectAction) => {
    isDirtyRef.current = true;
    dispatchProjectReducer(action);
  };

  
  // Copia editable del proyecto (el "borrador" que ve el usuario)
  const [project, dispatchProjectReducer] = useReducer(
    projectReducer,
    initialProject
  );

  
  // Crear Tarea editable del proyecto (el "borrador" que ve el usuario)
  const [currentTask, setCurrentTask] = useReducer(taskReducer, null);
  
  /*
   * Ref con el valor MÁS RECIENTE de lo que se necesita al guardar.
   * Un cleanup de useEffect captura los valores del render en que se CREÓ
   * (stale closure); con la ref leemos el estado actual al momento.
   */
  const latestRef = useRef({ project, projects, updateProject });
  latestRef.current = { project, projects, updateProject };

  const isDirtyRef = useRef(false); // ¿El usuario hizo cambios?
  const isDeletedRef = useRef(false); // ¿El proyecto fue eliminado?

  /*
   * Autosave (write-through): cada cambio del usuario se sincroniza con el
   * storage MIENTRAS el proyecto está abierto. Así los datos ya están
   * guardados sin importar cómo se salga (botón volver, navbar o back del
   * navegador) y el guardado no depende del timing del desmonte.
   */
  useEffect(() => {
    const { project, projects, updateProject } = latestRef.current;

    if (!project || !isDirtyRef.current || isDeletedRef.current) return;

    // Los proyectos que aún no existen se crean explícitamente
    // con handleExit("save")
    if (!projects.some((p) => p.id === project.id)) return;

    updateProject(project, true);
  }, [project]);

  // Progreso calculado a partir de las tareas (para barras y métricas)
  const { progress, total, completed, status } = useProjectProgress(
    project?.tasks ?? [],
  );

  /*
   * Acciones al salir de la vista:
   * - "save":   guarda explícito (también CREA el proyecto si es nuevo)
   * - "delete": elimina y bloquea el autosave para que no lo "resucite"
   */
  const handleExit = (action: "save" | "delete") => {
  if (!project) return;

  if (action === "delete") {
    isDeletedRef.current = true;
    removeProject(project);
    navigate('/dashboard/projects/');
    return;
  }

  const projectExists = projects.some((p) => p.id === project.id);

  if (projectExists) {
    updateProject(project);
  } else {
    addProject(project);
  }

  navigate('/dashboard/projects/');
};

  return {
    currentTask,
    setCurrentTask,
    project,
    progress,
    completed,
    total,
    status,
    dispatchProject,
    handleExit,
    removeProject,
  };
};

export { useOpenProject };
