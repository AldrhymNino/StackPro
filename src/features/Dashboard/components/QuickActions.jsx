// Hooks
import { useNavigate } from 'react-router-dom';

// Components
import { Button } from '../../../components';

// Styles
import styles from '../dashboard.module.css';

const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <>
      <h3 className={styles['title_actions']}>¿Qué quieres hacer hoy?</h3>
      <div className={styles["quick-actions"]}>
        <Button primary handle={() => navigate('/proyects/create')}>Nuevo Proyecto</Button>
        <Button primary>Agregar Tarea</Button>
        <Button primary>Crear Meta</Button>
      </div>
    </>
  );
};

export { QuickActions };
