import type { ReactNode } from "react";

import { useOpenProject } from "../OpenProject/hooks/useOpenProject";
import { OpenProjectContext } from "./useOpenProjectContext";

/*
 * ProjectProvider — ejecuta la lógica del proyecto abierto (useOpenProject)
 * UNA sola vez y la comparte con toda la vista a través del contexto.
 * Así cualquier sección (tareas, propiedades, header...) consume los
 * mismos datos y acciones sin prop drilling.
 */

type ProjectProviderProps = {
  children: ReactNode;
};

const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const projectState = useOpenProject();

  return (
    <OpenProjectContext.Provider value={projectState}>
      {children}
    </OpenProjectContext.Provider>
  );
};

export { ProjectProvider };
