// Tipos de Proyectos y Tareas
interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
  deadline: string;
  updatedAt?: string;
  tasks: task[];
}

type ProjectStatus = 'done' | 'progress' | 'canceled' | 'pending';

interface task {
  id: string;
  title: string;
  completed: boolean;
}

export type { Project, ProjectStatus, task };
