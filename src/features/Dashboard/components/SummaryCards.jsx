// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faBullseye,
  faStar,
  faProjectDiagram
} from '@fortawesome/free-solid-svg-icons';

// utils
import clsx from 'clsx';

// Components
import { CardDashboard } from '../../../components';

// Styles
import styles from '../dashboard.module.css';

const SummaryCards = () => {
  return (
    <div className={styles["summary-cards"]}>
      <CardDashboard className={clsx(styles["card"], styles['card1'])}>
        <FontAwesomeIcon icon={faCheckCircle} className={clsx(styles['icon'], styles['completed'])} />
        <h3>12 tareas completadas</h3>
      </CardDashboard>

      <CardDashboard className={clsx(styles["card"], styles['card2'])}>
        <FontAwesomeIcon icon={faBullseye} className={clsx(styles['icon'], styles['goals'])} />
        <h3>4 metas logradas</h3>
      </CardDashboard>

      <CardDashboard className={clsx(styles["card"], styles['card3'])}>
        <FontAwesomeIcon icon={faStar} className={clsx(styles['icon'], styles['exp'])} />
        <h3>Nivel 5 · 620 EXP</h3>
      </CardDashboard>

      <CardDashboard className={clsx(styles["card"], styles['card4'])}>
        <FontAwesomeIcon icon={faProjectDiagram} className={clsx(styles['icon'], styles['project'])} />
        <h3>3 proyectos activos</h3>
      </CardDashboard>
    </div>
  );
};

export { SummaryCards };
