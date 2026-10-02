// Icons
import { Folder } from "lucide-react";

// Components
import { Empty } from "../../../../components/Empty/Empty";
import { HeadProject } from "../components/HeadProject";
import { Topbar } from "../components/Topbar";
import { PropertiesProject } from "../components/PropertiesProject";
import { ActivityLogProject } from "../components/ActivityLogProject";
import { InfoProject } from "../components/InfoProject";
import { TasksMain } from "../components/TasksMain";

// Context
import { useOpenProjectContext } from "../../context/useOpenProjectContext";

// Styles
import styles from "../style.module.css";
import { useEffect } from "react";

/*
 * OpenProjectContainer — arma la vista completa del proyecto abierto.
 * La lógica vive en el hook (compartida vía ProjectProvider); este
 * componente solo compone las secciones.
 *
 * Nota: NO hace falta guardar al desmontar — el autosave del hook ya
 * persiste cada cambio mientras la vista está abierta.
 */
const OpenProjectContainer = () => {
  const { project, setCurrentTask, currentTask } = useOpenProjectContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Atajo Crear Tarea dentro de project ->
      if (!currentTask && !e.altKey && e.shiftKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        setCurrentTask({ type: "create-task" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentTask, setCurrentTask]);

  return !project ? (
    <Empty icon={<Folder />} text="No se encontró el proyecto." />
  ) : (
    <div className={styles.openProject}>
      <Topbar />
      <div className={styles.wrapper}>
        <HeadProject />

        <InfoProject />

        <TasksMain />

        <PropertiesProject />

        <ActivityLogProject />
      </div>
    </div>
  );
};

export { OpenProjectContainer };
