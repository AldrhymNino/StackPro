import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { LucideProps } from "lucide-react";

type DashboardIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

type DashboardStatTitle = "Proyectos" | "Notas" | "Roadmaps";

type DashboardTone =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

type DashboardStatDetail = {
  label: string;
  value: string | number;
};

type DashboardAction = {
  label: string;
  icon: DashboardIcon;
  path: string;
};

type DashboardStat = {
  title: DashboardStatTitle;
  total: number;
  icon: DashboardIcon;
  details: DashboardStatDetail[];
  actions: DashboardAction[];
};

type DashboardMetric = {
  id: string;
  label: string;
  value: string | number;
  helper?: string;
  trend?: string;
  icon?: DashboardIcon;
  tone?: DashboardTone;
};

type DashboardFocusItem = {
  id: string;
  title: string;
  description?: string;
  meta?: string;
  progress?: number;
  tone?: DashboardTone;
};

type DashboardActivityAction =
  | "created"
  | "updated"
  | "deleted"
  | "completed"
  | "status_changed";

type DashboardActivityType = "project" | "task" | "note" | "roadmap";

type DashboardActivity = {
  id: string;
  type: DashboardActivityType;
  action: DashboardActivityAction;
  title: string;
  description: string;
  timestamp: string;
  meta: string;
  tone: DashboardTone;
  url: string;
};


export type {
  DashboardAction,
  DashboardActivity,
  DashboardActivityType,
  DashboardFocusItem,
  DashboardIcon,
  DashboardMetric,
  DashboardStat,
  DashboardStatDetail,
  DashboardStatTitle,
  DashboardTone,
  DashboardActivityAction
};
