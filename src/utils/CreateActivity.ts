import type { DashboardActivity } from "../features/dashboard/types";

const createActivity = (
  action: DashboardActivity["action"],
  type: DashboardActivity["type"],
  title: string,
  description: string,
  meta: string,
  url: string,
  tone: DashboardActivity["tone"]
): Omit<DashboardActivity, "id" | "timestamp"> => {
  return {
    action,
    type,
    title,
    description,
    meta,
    url,
    tone,
  };
};

export { createActivity };