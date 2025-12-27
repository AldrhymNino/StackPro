import type { Dispatch, SetStateAction } from 'react';
import type { Project } from '../../../../types/Project';

type SetProject = Dispatch<SetStateAction<Project | null>>;

export const useProjectTasks = (project: Project | null, setProject: SetProject) => {
    
  if (!project) {
    return {
      toggleTask: () => {},
      editTask: () => {},
      deleteTask: () => {}
    };
  }

  const toggleTask = (taskId: string) => {
    const updatedTasks = project.tasks.map(t =>
      t.id === taskId ? { ...t, done: !t.done } : t
    );

    const completed = updatedTasks.filter(t => t.done).length;

    const status: Project['status'] =
      completed === updatedTasks.length
        ? 'done'
        : completed > 0
        ? 'progress'
        : 'pending';

    setProject({
      ...project,
      tasks: updatedTasks,
      status
    });
  };

  const editTask = (id: string, newTitle: string) => {
    setProject({
      ...project,
      tasks: project.tasks.map(t =>
        t.id === id ? { ...t, title: newTitle } : t
      )
    });
  };

  const deleteTask = (id: string) => {
    setProject({
      ...project,
      tasks: project.tasks.filter(t => t.id !== id)
    });
  };

  return {
    toggleTask,
    editTask,
    deleteTask
  };
};
