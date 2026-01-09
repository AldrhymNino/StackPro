// Hooks
import { useParams } from 'react-router-dom';

// types
import type { Roadmap } from '../../../types/Roadmap';

// Styles
import styles from './style.module.css';

// Component
import { ArrowLeft, Check, Trash } from 'lucide-react';
import { Button } from '../../../components/Buttons/Buttons';
import { Step } from './components/step/Step';
import { useRoadMap } from '../hooks/useRoadMap';
import { useState } from 'react';

const OpenRoadMap = () => {
  const { id } = useParams();
  const { updateRoadMap, current, removeRoadMap } = useRoadMap(id);
  const [roadmap, setRoadMap] = useState<Roadmap | null>(current);

  if (!roadmap) return <div>No existe este RoadMap...</div>;

  const handleChange = (secctionID: string, id: string) => {
    const rmpOB: Roadmap = {
      ...roadmap,
      section: roadmap.section.map((sec) => {
        if (sec.id === secctionID) {
          const checkStep = sec.steps.map((step) =>
            id === step.id ? { ...step, done: !step.done } : step
          );

          const done = checkStep.every(({ done }) => done);

          return { ...sec, steps: checkStep, done };
        }
        return sec;
      })
    };

    setRoadMap((prev) => {
      return { ...prev, ...rmpOB };
    });
  };

  return (
    <div className={styles.container}>
      <Button onClick={() => window.history.back()} variant="icon">
        <ArrowLeft size={18} />
      </Button>
      <h1 className={styles.title}>{roadmap?.title}</h1>
      <div className={styles.sectionList}>
        {roadmap.section.map(({ id: sectionID, title, description, steps, done }) => (
          <div className={styles.section} key={sectionID}>
            <h2
              style={{
                color: done ? 'var(--success)' : 'var(--text)'
              }}
            >
              {title}
            </h2>
            <p style={{ color: done ? 'var(--success)' : 'var(--text)' }}>{description}</p>
            <div className={styles.stepList}>
              {steps.map(({ id: stepID, title, done }) => (
                <Step
                  key={stepID}
                  styles={styles}
                  step={{ id: stepID, title, done }}
                  handleChange={() => handleChange(sectionID, stepID)}
                />
              ))}
            </div>
          </div>
        ))}
        <div className={styles.actionsGroup}>
          <Button onClick={() => updateRoadMap(roadmap)}  variant='primary-icon' >
            <Check /> <span>Guardar</span>
          </Button>
          <Button onClick={() => removeRoadMap(roadmap)} style={{background: 'var(--error)'}}  variant='primary-icon' >
            <Trash /> <span>Eliminar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export { OpenRoadMap };
