import styles from './style.module.css';

const PageLoader = () => {
  return (
    <div
      aria-label="Cargando página"
      aria-live="polite"
      className={styles.wrapper}
      role="status"
    >
      <span className={styles.spinner} />
    </div>
  );
};

export { PageLoader };
