import type { Priority } from "../../../../types/Project";

export const priorityStyles: Record<Priority, 'success' | 'warning' | 'error'> = {
  baja: "success",
  normal: "warning",
  alta: "error",
};

export const priorities: Priority[] = [
  "baja",
  "normal",
  "alta",
];