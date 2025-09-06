// Components
import { NavWorkspace, Progressbar } from '../../components';

// Hooks
import { useNavigate } from 'react-router-dom';
import { useStorageProyects } from '../../service/useStorageProyects';

// Styles
import styles from './proyects.module.css';

const Proyects = () => {
    const { state } = useStorageProyects();
    const navigate = useNavigate();

    const openProyect = (proyect) => {
        navigate(`/proyects/${proyect.title}`);
    };

    return (
        <div className={styles["proyects"]}>
            <h1>Proyects</h1>
            <NavWorkspace />
            <div className={styles["proyects_list"]}>
                {state && state.map(proyect => {

                    const totalTasks = proyect.tasks?.length || 0;
                    const completedTasks = proyect.tasks?.filter((t) => t.done).length || 0;
                    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

                    return (
                        <div onClick={() => openProyect(proyect)} className={styles.card} key={proyect.id} role="article" aria-labelledby="projectTitle2">
                            <header className={styles.cardHeader}>
                                <h3 id="projectTitle2" className={styles.title}>{proyect.title}</h3>
                                <span className={styles.badge} aria-label="plan">PRO</span>
                            </header>

                            <p className={styles.description}>
                                {proyect.description}
                            </p>

                            <Progressbar progress={progress} />

                            <footer className={styles.cardFooter}>
                                <span className={styles.meta}>
                                <svg className={styles.icon} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                                    <rect x="3" y="4" width="18" height="16" rx="2" ry="2" fill="currentColor" opacity="0.15"></rect>
                                    <path d="M8 2v4M16 2v4M3 8h18M5 12h4M11 12h4M17 12h2M5 16h4M11 16h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"></path>
                                </svg>
                                <time dateTime="2024-07-01">Created: {proyect.created}</time>
                                </span>
                            </footer>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export { Proyects };