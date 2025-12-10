import { useState } from 'react';
import { useStorage } from '../../../hooks/useStorage';
import type { Project, ProjectStatus } from '../../../types/Project';
import { NavProject } from './components/NavProject/NavProject';
import { ProjectCard } from './components/ProjectCard/ProjectCard';
import styles from './style.module.css';

export type Filter = 'all' | ProjectStatus;

const Projects = () => {
  const { state } = useStorage<Project>('projects');
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<Filter | string>('all');

  const filterRender = () => {
    let filtered = state;

    // Filtra por texto si hay input
    if (inputValue.trim() !== '') {
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(inputValue.toLowerCase()));
    }

    // Filtra por estado si no es "all"
    if (filter !== 'all') {
      filtered = filtered.filter((p) => p.status === filter);
    }

    return filtered;
  };

  return (
    <div className={styles.project}>
      <NavProject state={{ filter, setFilter }} stateInput={{ inputValue, setInputValue }} />

      <div className={styles.content}>
        {filterRender().length === 0 && inputValue ? (
          <p style={{ textAlign: 'center' }}>No hay proyectos disponibles con ese nombre.</p>
        ) : filterRender().length === 0 && inputValue === '' ? (
          <p style={{ textAlign: 'center' }}>No hay proyectos disponibles.</p>
        ) : (
          <div className={styles.container}>
            {filterRender().map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { Projects };
