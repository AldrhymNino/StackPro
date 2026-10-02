/*
 * Tipos de Proyectos y Tareas
 *
 * Project       → un proyecto completo (título, status, tareas, fechas...)
 * Task          → una tarea dentro de un proyecto
 * Priority      → prioridad de un proyecto o tarea ("baja" | "normal" | "alta")
 * ProjectStatus → estado del proyecto ("done" | "progress" | "canceled" | "pending")
 */

import type { DashboardActivity } from "../features/dashboard/types";

type Priority = "baja" | "normal" | "alta";

type ProjectStatus = "done" | "progress" | "canceled" | "pending";

interface Task {
  id: string;
  title: string;
  createdAt: string;
  priority: Priority;
  done: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
  deadline: string | null;
  updatedAt: string;
  tasks: Task[];
  priority: Priority;
  activityLog: DashboardActivity[];
}

export type { Project, ProjectStatus, Task, Priority };
