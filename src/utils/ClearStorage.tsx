import { useEffect } from 'react';
import { useStorage } from '../hooks/useStorage';
import type { Project } from '../types/Project';

function ClearStorage() {
  const { dispatch } = useStorage<Project>('projects');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ejemplo: Alt + C
      if (e.altKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        dispatch({ type: 'clear' });

        // evita conflictos con atajos del navegador
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null; // no renderiza nada visual
}

export { ClearStorage };
