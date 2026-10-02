import {
  Activity,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Eye,
  MapIcon,
  PlusCircle,
  StickyNote,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

// Hooks
import { useProject } from "../../projects/hooks/useProject";
import { useNote } from "../../notes/hooks/useNote";
import { useRoadMap } from "../../roadmap/hooks/useRoadMap";

// Types
import type { DashboardMetric, DashboardStat } from "../types";

const useDashboard = () => {
  const { projects } = useProject();
  const { notes } = useNote();
  const { roadmaps } = useRoadMap();

  const navigate = useNavigate();

  const tasks = projects.flatMap((project) => project.tasks);

  const completedTasks = tasks.filter((task) => task.done).length;

  const openTasks = tasks.length - completedTasks;

  const projectProgress =
    tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  const steps = roadmaps.flatMap((roadmap) => roadmap.section.flatMap((section) => section.steps));

  const completedRoadmaps = steps.filter((step) => step.done).length;

  const roadmapProgress =
    steps.length === 0
      ? 0
      : Math.round(
          (completedRoadmaps / steps.length) * 100,
        );

  const workspaceHealth = Math.round((projectProgress + roadmapProgress) / 2);

  const projectStats = projects.reduce(
    (acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    },
    {
      done: 0,
      progress: 0,
      pending: 0,
      canceled: 0,
    },
  );

  const roadmapStats = roadmaps.reduce(
    (acc, roadmap) => {
      const allDone = roadmap.section.every((section) => section.done);
      const inProgress = roadmap.section.some((section) =>
        section.steps.some((step) => step.done),
      );

      if (allDone) acc.done++;
      else if (inProgress) acc.inProgress++;
      else acc.pending++;

      return acc;
    },
    {
      done: 0,
      inProgress: 0,
      pending: 0,
    },
  );

  const activeProjects = projects.filter(
    (project) =>
      project.status !== "done" &&
      project.status !== "canceled" &&
      project.deadline,
  );

  const nearestDeadline = [...activeProjects].sort((a, b) => {
    const aTime = a.deadline ? new Date(a.deadline).getTime() : Infinity;
    const bTime = b.deadline ? new Date(b.deadline).getTime() : Infinity;

    return aTime - bTime;
  })[0];

  const daysUntilDeadline = () => {
    if (!nearestDeadline?.deadline) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadline = new Date(nearestDeadline.deadline);
    deadline.setHours(0, 0, 0, 0);

    return Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
  };

  const getDeadlineText = () => {
    const days = daysUntilDeadline();

    if (days === null) return "Sin deadlines";
    if (days > 1) return `Faltan ${days} días`;
    if (days === 1) return "Falta 1 día";
    if (days === 0) return "Vence hoy";

    return `Vencido hace ${Math.abs(days)} días`;
  };

  const stats: DashboardStat[] = [
    {
      title: "Proyectos",
      total: projects.length,
      icon: ClipboardList,
      details: [
        {
          label: "Próximo Deadline",
          value: nearestDeadline
            ? `${nearestDeadline.title} • ${getDeadlineText()}`
            : "Sin deadlines",
        },
        {
          label: "Activos",
          value: projectStats.progress + projectStats.pending,
        },
        {
          label: "Completados",
          value: projectStats.done,
        },
        {
          label: "En progreso",
          value: projectStats.progress,
        },
        {
          label: "Pendientes",
          value: projectStats.pending,
        },
        {
          label: "Cancelados",
          value: projectStats.canceled,
        },
      ],
      actions: [
        {
          label: "Ver Proyectos",
          icon: Eye,
          path: "/dashboard/projects",
        },
        {
          label: "Crear Proyecto",
          icon: PlusCircle,
          path: "/dashboard/projects/create",
        },
      ],
    },
    {
      title: "Notas",
      total: notes.length,
      icon: StickyNote,
      details: [],
      actions: [
        {
          label: "Ver Notas",
          icon: Eye,
          path: "/dashboard/notes",
        },
        {
          label: "Crear Nota",
          icon: PlusCircle,
          path: "/dashboard/notes/create",
        },
      ],
    },
    {
      title: "Roadmaps",
      total: roadmaps.length,
      icon: MapIcon,
      details: [
        {
          label: "Activos",
          value: roadmapStats.inProgress + roadmapStats.pending,
        },
        {
          label: "Completados",
          value: roadmapStats.done,
        },
        {
          label: "En progreso",
          value: roadmapStats.inProgress,
        },
        {
          label: "Pendientes",
          value: roadmapStats.pending,
        },
      ],
      actions: [
        {
          label: "Ver Roadmaps",
          icon: Eye,
          path: "/dashboard/roadmaps",
        },
        {
          label: "Crear Roadmap",
          icon: PlusCircle,
          path: "/dashboard/roadmaps/create",
        },
      ],
    },
  ];

  const metrics: DashboardMetric[] = [
    {
      id: "workspace-score",
      label: "Salud del workspace",
      value: `${workspaceHealth}%`,
      helper: "Promedio de avance entre proyectos y roadmaps.",
      icon: Activity,
      tone: "success",
    },
    {
      id: "open-tasks",
      label: "Tareas abiertas",
      value: openTasks,
      helper: "Pendientes repartidas entre todos los proyectos.",
      trend: openTasks > 0 ? `${openTasks} pendientes` : "Todo al día",
      icon: CheckCircle2,
      tone: "warning",
    },
    {
      id: "next-deadline",
      label: "Próximo deadline",
      value: getDeadlineText(),
      helper: nearestDeadline
        ? nearestDeadline.title
        : "No hay proyectos activos.",
      trend: nearestDeadline
        ? nearestDeadline.tasks.reduce(
            (acc, task) => acc + (task.done ? 1 : 0),
            0,
          )
          ? `${nearestDeadline.tasks.filter((task) => task.done).length} de ${nearestDeadline.tasks.length} tareas completadas`
          : "Sin tareas completadas"
        : "Sin tareas completadas",
      icon: CalendarClock,
      tone: "error",
    },
  ];

  return {
    navigate,
    stats,
    metrics,
    projectProgress,
    roadmapProgress,
  };
};

export { useDashboard };
