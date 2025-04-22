// Styles
import styles from '../dashboard.module.css';

const Greeting = () => {
  const username = "¡Hola, Aldrhym!"; // Luego puedes usar contexto

  return (
    <div className={styles['header-dashboard']}>
      <h2 className={styles["greeting"]}>{username}</h2>
      <p className="subtext">Este es tu resumen de progreso de StackPro</p>
    </div>
  );
};

export { Greeting };
