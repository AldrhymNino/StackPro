// Icons
import { ArrowLeft, Flame, Trash } from "lucide-react";

// Components
import { Button } from "../../../../components/Buttons/Buttons";

// Context
import { useOpenProjectContext } from "../../context/useOpenProjectContext";

// Styles
import styles from "../style.module.css";

const Topbar = () => {
  const { handleExit} =  useOpenProjectContext();

  return (
    <div className={styles.topbar}>
      <Button
        variant="ghost"
        color="current"
        style={{color: 'var(--text-secondary)'}}
        // El autosave del hook ya guardó los cambios: solo hay que salir
        onClick={() => handleExit('save')}
      >
        <ArrowLeft />
        <span>Volver a Proyectos</span>
      </Button>
      <div className={styles.group}>
        <Button variant="ghost">
          <Flame />
          <span>Modo Enfoque</span>
        </Button>
        <Button
          variant="ghost"
          color="error"
          onClick={() => handleExit("delete")}
        >
          <Trash />
          <span>Eliminar Proyecto</span>
        </Button>
      </div>
    </div>
  );
};

export { Topbar };
