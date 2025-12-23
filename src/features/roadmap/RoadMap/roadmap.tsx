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
import { Empy } from '../../../components/Empy/Empy';
import { Card } from '../../../components/Card/Card';

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
        <Empy text='No has creado roadmaps aún.' icon={<Map size={40}/>}/>
      ) : (
        <div className={styles.grid}>
          {roadmaps.map((rm) => {
            const done = rm.section.filter((s) => s.done).length;
            const doneStep = rm.section.reduce(
              (acc, { steps }) => {
                const completed = steps.filter((step) => step.done).length;

                acc.done += completed;
                acc.length += steps.length;

                return acc; // siempre retorno el acumulador
              },
              { done: 0, length: 0 }
            );

            const steps = rm.section.flatMap((sec) => sec.steps);

            return (
              <Card
                key={rm.id}
                onClick={() => navigate(`/dashboard/roadmaps/${rm.id}`)}
              >
                <h2>{rm.title}</h2>
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
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
};

export { Roadmap };
