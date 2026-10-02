// Context
import { useNotification } from "../../../context/notificationContext";

// Hooks
import { useStorage } from "../../../hooks/useStorage";
import { useState } from "react";

// Utils
import { createNotification } from "../../../utils/CreateNotification";

// types
import type { Project, ProjectStatus } from "../../../types/Project";
import { useNavigate } from "react-router-dom";

type Filter = "all" | ProjectStatus;
// type ProjectInput = Pick<Project, "title" | "description" | "deadline" | "tasks"> &
//   Partial<Pick<Project, "id" | "createdAt" | "updatedAt" | "status" | "priority">>;

const useProject = () => {
  const { state, dispatch } = useStorage<Project>("projects");
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const navigate = useNavigate();
  const { add } = useNotification();

  const createProject = () => {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const newProject: Project = {
      id,
      title: '',
      description: '',
      tasks: [],
      createdAt: now,
      updatedAt: now,
      status: "pending",
      priority: "normal",
      activityLog: [],
      deadline: null
    };

    localStorage.setItem('newproject', JSON.stringify(newProject));
    navigate(`/dashboard/projects/${id}`);
  };

  const addProject = (project: Project) => {
    // const now = new Date().toISOString();
    // const Project: Project = {
    //   id: project.id ?? crypto.randomUUID(),
    //   createdAt: project.createdAt ?? now,
    //   updatedAt: project.updatedAt ?? now,
    //   status: "pending",
    //   priority: "normal",
    //   activityLog: [],
    //   ...project,
    // };

    dispatch({ type: "add", payload: project });

    const notification = createNotification("success", 'project', project.id, `${project.title} Creado`, `Se creo el proyecto ${project.title} exitosamente`);

    add(notification);
  };

  const updateProject = (updatedProject: Project, silent = false) => {
    const projectToSave: Project = {
      ...updatedProject,
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: "update", payload: projectToSave });

    // Autosave silencioso: persiste sin notificar ni registrar actividad
    if (silent) return;

    const notification = createNotification("info", 'project', projectToSave.id, `${projectToSave.title} Actualizado`, `Se Actualizo el proyecto ${projectToSave.title} exitosamente`);

    add(notification);
  };

  const removeProject = (removedProject: Project) => {
    dispatch({ type: "remove", payload: removedProject });

    const notification = createNotification("error", 'project', removedProject.id, `${removedProject.title} Eliminado`, `Se elimino el proyecto ${removedProject.title} exitosamente`);

    add(notification);
  };

  const getProjectsByFilter = (): Project[] => {
    let filtered = state;

    // Filtra por texto si hay input
    if (keyword.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(keyword.toLowerCase()),
      );
    }

    // Filtra por estado si no es "all"
    if (filter !== "all") {
      filtered = filtered.filter((p) => p.status === filter);
    }

    return filtered;
  };

  return {
    projects: state,
    filteredProjects: getProjectsByFilter(),
    keyword,
    setKeyword,
    filter,
    setFilter,
    addProject,
    updateProject,
    removeProject,
    createProject
  };
};

export { useProject };
