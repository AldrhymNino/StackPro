// styles
import styles from './style.module.css';

// hooks
import { useNavigate } from 'react-router-dom';

// types
import type { RoadmapStep, Roadmap as RoadmapType } from '../../../types/Roadmap';

// icons
import { Map, Plus } from 'lucide-react';
import { Button } from '../../../components/Buttons/Buttons';
import { Progressbar } from '../../../components/Progressbar/Progressbar';
import { Search } from '../../../components/Search/Search';
import { useStorage } from '../../../hooks/useStorage';

const Roadmap = () => {
  const navigate = useNavigate();
  const { state: roadmaps } = useStorage<RoadmapType>('roadmap');

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <Search />
        <Button variant="primary-icon" onClick={() => navigate('/dashboard/roadmaps/create')}>
          <Plus size={18} /> Nuevo roadmap
        </Button>
      </header>

      {roadmaps.length === 0 ? (
        <div className={styles.empty}>
          <Map size={40} />
          <p>No has creado roadmaps aún.</p>
        </div>
      ) : (
        <ul className={styles.grid}>
          {roadmaps.map((rm) => {
            const done = rm.section.filter((s) => s.completed).length;
            const doneStep = rm.section.reduce(
              (acc, { steps }) => {
                const completed = steps.filter((step) => step.completed).length;

                acc.done += completed;
                acc.length += steps.length;

                return acc; // siempre retorno el acumulador
              },
              { done: 0, length: 0 }
            );

            const steps = rm.section.flatMap((sec) => sec.steps);

            return (
              <li
                key={rm.id}
                className={styles.card}
                onClick={() => navigate(`/dashboard/roadmaps/${rm.id}`)}
              >
                <h2 className={styles.cardTitle}>{rm.title}</h2>
                <p className={styles.cardDesc}>{rm.description || 'Sin descripción'}</p>

                <Progressbar<RoadmapStep> list={[...steps]} />
                <span className={styles.small}>
                  Bloques completados: {done}/{rm.section.length}
                </span>
                <span className={styles.small}>
                  tareas completadas: {doneStep.done}/{doneStep.length}
                </span>
                <span className={styles.date}>
                  Creado el {new Date(rm.createdAt).toLocaleDateString('es-CO')}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export { Roadmap };
