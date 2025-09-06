import { useEffect, useReducer } from "react";

const useStorageProyects = () => {
  const reducer = (state, { type, payload }) => {
    switch (type) {
      case 'add':
        return [...state, payload];

      case 'remove':
        return state.filter((item) => item.id !== payload); // payload ahora es solo el id

      case 'update':
        return state.map((item) =>
          item.id === payload.id ? { ...item, ...payload } : item
        );

      case 'clear':
        return [];

      default:
        return state; // 🔥 evita que el estado sea undefined
    }
  };

  const [state, dispatch] = useReducer(reducer, [], () => {
    const stored = localStorage.getItem('proyects');
    return stored ? JSON.parse(stored) : []; // 🔥 hidrata el estado inicial
  });

  useEffect(() => {
    localStorage.setItem('proyects', JSON.stringify(state));
  }, [state]);

  return { state, dispatch };
};

export { useStorageProyects };
