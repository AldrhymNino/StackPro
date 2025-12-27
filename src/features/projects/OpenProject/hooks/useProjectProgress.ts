import type { task, Project } from '../../../../types/Project';

type ProjectStatus = Project['status'];

export const useProjectProgress = (tasks: task[]) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;

  const progress = total > 0
    ? Math.round((completed / total) * 100)
    : 0;

  const status: ProjectStatus =
    total === 0
      ? 'pending'
      : completed === total
      ? 'done'
      : completed > 0
      ? 'progress'
      : 'pending';

  return {
    total,
    completed,
    progress,
    status
  };
};
