// Styles
import styles from './style.module.css';

// Type
type ProgressbarProps<t> = {
  list: t[];
};

const Progressbar = <T extends { completed: boolean }>({ list }: ProgressbarProps<T>) => {
  const done = list.filter((item) => item.completed).length;
  const progress = (done / list.length) * 100;

  return (
    <div className={styles.progressBar}>
      <div
        className={styles.progressFill}
        style={{ width: `${progress}%`, background: 'var(--success)' }}
      />
    </div>
  );
};

export { Progressbar };
