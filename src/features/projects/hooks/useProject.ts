import { useState } from "react";
import { useNotification } from "../../../context/notificationsContext";
import type { Project, ProjectStatus } from "../../../types/Project";
import { useStorage } from "../../../hooks/useStorage";

type Filter = 'all' | ProjectStatus;

const useProject = (id?: string) => {
  const { state, dispatch } = useStorage<Project>('projects');
  const [keyword, setKeyword] =  useState('');
  const [filter, setFilter] = useState<Filter | string>('all');
  const { add } = useNotification();

  const addProject = (project: Pick<Project, 'title' | 'description' | 'deadline' | 'tasks'>) => {

    const newProject: Project = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'pending',
      ...project,
  
    };
    
    dispatch({ type: 'add', payload: newProject });
    add({
        title: 'Proyecto creado',
        message: 'El proyecto "' + project.title + '" ha sido creado exitosamente.',
        type: 'success',
        entity: {
            type: 'project',
            id: newProject.id
        }
    });
  };

  const updateProject = (updatedProject: Project) => {
    dispatch({ type: 'update', payload: updatedProject });
    add({
        title: 'Proyecto Actualizado',
        message: 'El proyecto "' + updatedProject.title + '" ha sido actualizado exitosamente.',
        type: 'info',
        entity: {
            type: 'project',
            id: updatedProject.id
        }
    });
  }

  const removeProject = (removedProject: Project) => {
    dispatch({ type: 'remove', payload: removedProject });
    add({
        title: 'Proyecto Eliminado',
        message: 'El proyecto "' + removedProject.title + '" ha sido eliminado exitosamente.',
        type: 'error',
        entity: {
            type: 'project',
            id: removedProject.id
        }
    });
  }


  const getProject = (): Project | null => state.find(p => p.id === id) || null;

  const getProjectsByFilter = (): Project[] => {
     let filtered = state;

    // Filtra por texto si hay input
    if (keyword.trim() !== '') {
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(keyword.toLowerCase()));
    }

    // Filtra por estado si no es "all"
    if (filter !== 'all') {
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
    currentProject: getProject()
  };
}

export { useProject };