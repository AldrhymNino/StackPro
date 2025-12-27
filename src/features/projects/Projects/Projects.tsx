import { NavProject } from './components/NavProject/NavProject';
import { ProjectCard } from './components/ProjectCard/ProjectCard';
import styles from './style.module.css';
import { Empy } from '../../../components/Empy/Empy';
import { FolderKanban } from 'lucide-react';
import { useProject } from '../hooks/useProject';



const Projects = () => {
  const { filteredProjects, keyword, setKeyword, filter, setFilter } = useProject();

  return (
    <div className={styles.project}>
      <NavProject state={{ filter, setFilter }} stateInput={{ keyword, setKeyword }} />

      <div className={styles.content}>
        {filteredProjects.length === 0 && keyword ? (
          <Empy text='No hay proyectos disponibles con ese nombre.' icon={<FolderKanban size={40} />}/>
        ) : filteredProjects.length === 0 && keyword === '' ? (
          <Empy text='No hay proyectos disponibles.' icon={<FolderKanban size={40} />}/>
        ) : (
          <div className={styles.container}>
            {filteredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { Projects };
