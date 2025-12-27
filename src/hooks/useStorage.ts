import { useEffect, useReducer } from 'react';

// 🔹 Tipo genérico de acción
type Action<T> =
  | { type: 'add' | 'remove' | 'update'; payload: T }
  | { type: 'clear'; payload?: null };

type Key = 'notes' | 'projects' | 'roadmap' | 'notifications';

// 🔹 Hook principal genérico
function useStorage<T extends { id: string }>(key: Key) {
  const reducer = (state: T[], { type, payload }: Action<T>) => {
    switch (type) {
      case 'add':
        return [...state, payload];

      case 'remove':
        return state.filter((item) => item.id !== payload.id);

      case 'update':
        return state.map((item) => (item.id === payload.id ? { ...item, ...payload } : item));

      case 'clear':
        return [];

      default:
        return state;
    }
  };

  // 🔹 Inicialización perezosa (lee localStorage una sola vez)
  const [state, dispatch] = useReducer(reducer, [], () => {
    const stored = localStorage.getItem(key);
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch (err) {
      console.warn(`Error parsing ${key} from localStorage:`, err);
      return [];
    }
  });

  // 🔹 Sincronización con localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return { state, dispatch };
}

export { useStorage };
