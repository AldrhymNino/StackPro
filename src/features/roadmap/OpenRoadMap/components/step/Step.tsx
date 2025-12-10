import type { RoadmapStep } from '../../../../../types/Roadmap';

type StepsProps = {
  styles: { [key: string]: string };
  step: RoadmapStep;
  handleChange: () => void;
};

const Step = ({ styles, step, handleChange }: StepsProps) => {
  const { id, title, done } = step;
  return (
    <div className={styles.step}>
      <input type="checkbox" onChange={handleChange} checked={done} id={id} />
      <label style={{ color: done ? 'var(--success)' : 'var(--text)' }} htmlFor={id}>
        {title}
      </label>
    </div>
  );
};

export { Step };
