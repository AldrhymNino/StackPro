// Components
import { Button } from '../../components';

// Icons FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faBullseye, faStar, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';

// Styles
import styles from './dashboard.module.css';

const Dashboard = () => {
    const username = "¡Hola, Aldrhym!"; // Esto podría venir del contexto o props

    return (
        <div className={styles['dasboard-home']}>
            <h2 className={styles["greeting"]}>{username}</h2>
            <p className="subtext">Este es tu resumen de progreso de StackPro</p>

            <div className={styles["summary-cards"]}>
                <div className={styles["card"]}>
                    <FontAwesomeIcon icon={faCheckCircle} className="icon completed" />
                    <h3>12 tareas completadas</h3>
                </div>

                <div className={styles["card"]}>
                    <FontAwesomeIcon icon={faBullseye} className="icon goals" />
                    <h3>4 metas logradas</h3>
                </div>

                <div className={styles["card"]}>
                    <FontAwesomeIcon icon={faStar} className="icon exp" />
                    <h3>Nivel 5 · 620 EXP</h3>
                </div>

                <div className={styles["card"]}>
                    <FontAwesomeIcon icon={faProjectDiagram} className="icon project" />
                    <h3>3 proyectos activos</h3>
                </div>
            </div>

            <h3 className={styles['title_actions']}>¿Que quieres hacer hoy?</h3>
            <div className={styles["quick-actions"]}>
                <Button className="btn primary">Nuevo Proyecto</Button>
                <Button className="btn primary">Agregar Tarea</Button>
                <Button className="btn primary">Crear Meta</Button>
            </div>
        </div>
    );
};

export { Dashboard};