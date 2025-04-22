// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faDiagramProject, faSpinner } from '@fortawesome/free-solid-svg-icons';


// Components
import { Button } from '../../components';

// Styles
import styles from './proyects.module.css';

const Proyects = () => {
    return (
        <div className="proyects">
            <h1>Proyects</h1>
            <div className={styles['nav-proyects']}>
                <div className={styles['category-actions']}>
                    <Button ghost><FontAwesomeIcon className={styles['icon']} icon={faDiagramProject} /><div>Active</div></Button>
                    <Button ghost><FontAwesomeIcon className={styles['icon']} icon={faSpinner} /> <div>In progress</div></Button>
                    <Button ghost><FontAwesomeIcon className={styles['icon']} icon={faCircleXmark} /> <div>Cancel</div></Button>
                </div>
            </div>
        </div>
    )
};

export { Proyects };