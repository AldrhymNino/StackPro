// Components
import { Button, Card } from '../../components';

// Icons FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faBullseye, faStar, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';

// Styles
import styles from './dashboard.module.css';
import clsx from 'clsx';

const Dashboard = () => {
    const username = "¡Hola, Aldrhym!"; // Esto podría venir del contexto o props

    return (
        <div className={styles['dashboard-home']}>
            <h2 className={styles["greeting"]}>{username}</h2>
            <p className="subtext">Este es tu resumen de progreso de StackPro</p>

            <div className={styles["summary-cards"]}>
                <Card head={<FontAwesomeIcon icon={faCheckCircle} className={clsx(styles['icon'], styles['completed'])} />} className={styles["card"]}>
                    <h3>12 tareas completadas</h3>
                </Card>

                <Card head={<FontAwesomeIcon icon={faBullseye} className={clsx(styles['icon'], styles['goals'])} />} className={styles["card"]}>
                    <h3>4 metas logradas</h3>
                </Card>

                <Card head={<FontAwesomeIcon icon={faStar} className={clsx(styles['icon'], styles['exp'])} />} className={styles["card"]}>
                    <h3>Nivel 5 · 620 EXP</h3>
                </Card>

                <Card head={<FontAwesomeIcon icon={faProjectDiagram} className={clsx(styles['icon'], styles['project'])} />} className={styles["card"]}>
                    <h3>3 proyectos activos</h3>
                </Card>
            </div>

            <h3 className={styles['title_actions']}>¿Que quieres hacer hoy?</h3>
            <div className={styles["quick-actions"]}>
                <Button primary>Nuevo Proyecto</Button>
                <Button primary>Agregar Tarea</Button>
                <Button primary>Crear Meta</Button>
            </div>
        </div>
    );
};

export { Dashboard};