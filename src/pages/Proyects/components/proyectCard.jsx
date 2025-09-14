// Styles
import { Progressbar } from '../../../components';
import styles from './proyectcard.module.css';

const ProyectCard = ({ proyect, openProyect, progress }) => {
    return (
        <div onClick={() => openProyect(proyect)} className={styles.card} key={proyect.id} role="article" aria-labelledby="projectTitle2">
            <header className={styles.cardHeader}>
                <h3 id="projectTitle2" className={styles.title}>{proyect.title}</h3>
                <span className={styles.badge} aria-label="plan">{ progress < 100 ? 'Progress' : ' Done' }</span>
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
    );
}


export { ProyectCard };
