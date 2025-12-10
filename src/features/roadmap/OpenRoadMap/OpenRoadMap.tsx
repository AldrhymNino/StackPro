// Hooks
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStorage } from '../../../hooks/useStorage';

// types
import type { Roadmap } from '../../../types/Roadmap';

// Styles
import styles from './style.module.css';

// Component
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/Buttons/Buttons';
import { Step } from './components/step/Step';

const OpenRoadMap = () => {
  const { id } = useParams();
  const { state: roadmaps, dispatch } = useStorage<Roadmap>('roadmap');
  const [roadmap, setRoadMap] = useState<Roadmap>();

  useEffect(() => {
    const rmp = roadmaps.find((r) => r.id === id);
    setRoadMap(rmp);
  }, [roadmaps]);

  if (!roadmap) return <div>No existe este RoadMap...</div>;

  const handleChange = (secctionID: string, id: string) => {
    const rmpOB: Roadmap = {
      ...roadmap,
      section: roadmap.section.map((sec) => {
        if (sec.id === secctionID) {
          const checkStep = sec.steps.map((step) =>
            id === step.id ? { ...step, completed: !step.completed } : step
          );

          const done = checkStep.every(({ completed }) => completed);

          return { ...sec, steps: checkStep, completed: done };
        }
        return sec;
      })
    };

    setRoadMap((prev) => {
      dispatch({ type: 'update', payload: { ...rmpOB } });
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
        {roadmap.section.map(({ id: sectionID, title, description, steps, completed }) => (
          <div className={styles.section} key={sectionID}>
            <h2
              style={{
                color: completed ? 'var(--success)' : 'var(--text)'
              }}
            >
              {title}
            </h2>
            <p style={{ color: completed ? 'var(--success)' : 'var(--text)' }}>{description}</p>
            <div className={styles.stepList}>
              {steps.map(({ id: stepID, title, completed }) => (
                <Step
                  key={stepID}
                  styles={styles}
                  step={{ id: stepID, title, completed }}
                  handleChange={() => handleChange(sectionID, stepID)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { OpenRoadMap };
