/*
 * useStorage — capa de persistencia de la app.
 *
 * Cada colección ("projects", "notes", "roadmap", "activityLog") vive en
 * localStorage y se expone como estado de React con un reducer simple
 * (add / update / remove).
 *
 * memoryCache guarda la última lista en memoria: así, si un componente
 * se desmonta y otro se monta (al navegar), lee los datos al instante
 * sin esperar a parsear localStorage otra vez.
 */
import { useEffect, useReducer } from "react";

type Action<T> = {
  type: "add" | "remove" | "update";
  payload: T;
};

type Key = "notes" | "projects" | "roadmap" | "notifications" | "activityLog";
type StoredItem = { id: string };

const memoryCache: Partial<Record<Key, StoredItem[]>> = {};

function useStorage<T extends StoredItem>(key: Key) {
  const reducer = (state: T[], { type, payload }: Action<T>): T[] => {
    switch (type) {
      case "add":
        return [...state, payload];

      case "remove":
        return state.filter((item) => item.id !== payload.id);

      case "update":
        return state.map((item) =>
          item.id === payload.id ? { ...item, ...payload } : item,
        );

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, [], () => {
    if (memoryCache[key]) {
      return memoryCache[key] as T[];
    }

    const stored = localStorage.getItem(key);

    if (!stored) {
      memoryCache[key] = [];
      return [];
    }

    try {
      const parsed = JSON.parse(stored);
      const data = Array.isArray(parsed) ? (parsed as T[]) : [];
      memoryCache[key] = data;
      return data;
    } catch (err) {
      console.warn(`Error parsing ${key} from localStorage:`, err);
      memoryCache[key] = [];
      return [];
    }
  });

  useEffect(() => {
    memoryCache[key] = state;
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return { state, dispatch };
}

export { useStorage, memoryCache };
