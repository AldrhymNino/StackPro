import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { SearchItem } from "../types/SearchItem";
import type { Note } from "../types/Notes";
import type { Project } from "../types/Project";
import type { Roadmap } from "../types/Roadmap";
import { useStorage } from "./useStorage";

const useSearch = () => {
  const { state: projects } = useStorage<Project>("projects");
  const { state: notes } = useStorage<Note>("notes");
  const { state: roadmap } = useStorage<Roadmap>("roadmap");
  const navigate = useNavigate();

  const searchIndex = useMemo<SearchItem[]>(() => {
    return [
      ...projects.map((project): SearchItem => ({
        id: project.id,
        type: "project",
        title: project.title,
        keywords: [project.title, project.description ?? ""],
        route: `/dashboard/projects/${project.id}`,
      })),

      ...notes.map((note): SearchItem => ({
        id: note.id,
        type: "note",
        title: note.title,
        keywords: [note.title, note.content ?? ""],
        route: `/dashboard/notes/${note.id}`,
      })),

      ...roadmap.map((roadmapItem): SearchItem => ({
        id: roadmapItem.id,
        type: "roadmap",
        title: roadmapItem.title,
        keywords: [roadmapItem.title],
        route: `/dashboard/roadmaps/${roadmapItem.id}`,
      })),
    ];
  }, [projects, notes, roadmap]);

  const router = useCallback(
    (route: string) => {
      navigate(route);
    },
    [navigate],
  );

  const queryList = useCallback(
    (query: string) => {
      const normalizedQuery = query.trim().toLowerCase();

      if (!normalizedQuery) return [];

      return searchIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(normalizedQuery) ||
          item.keywords.some((keyword) =>
            keyword.toLowerCase().includes(normalizedQuery),
          ),
      );
    },
    [searchIndex],
  );

  return {
    queryList,
    router,
  };
};

export { useSearch };
