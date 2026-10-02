import { createContext, useContext } from "react";

import type { useOpenProject } from "../OpenProject/hooks/useOpenProject";

/*
 * Contexto del proyecto abierto.
 *
 * ProjectProvider ejecuta useOpenProject() UNA sola vez y comparte su
 * resultado con toda la vista (proyecto, tareas, prioridad, autosave...).
 * Cualquier componente de la vista consume eso con useOpenProjectContext().
 */

type OpenProjectContextType = ReturnType<typeof useOpenProject>;

const OpenProjectContext = createContext<OpenProjectContextType | null>(null);

const useOpenProjectContext = () => {
  const context = useContext(OpenProjectContext);

  if (!context) {
    throw new Error(
      "useOpenProjectContext debe usarse dentro de ProjectProvider",
    );
  }

  return context;
};

export { OpenProjectContext, useOpenProjectContext };
export type { OpenProjectContextType };
