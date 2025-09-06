// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faDiagramProject, faSpinner } from '@fortawesome/free-solid-svg-icons';


// Components
import { Button, Search } from '../../components';

// Styles
import styles from './navworkspace.module.css';

// Hooks router
import { useLocation, useNavigate } from 'react-router-dom';

const NavWorkspace = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    return (
        <div className={styles['nav-proyects']}>
            <div className={styles['category-actions']}>
                <Button ghost><FontAwesomeIcon className={styles['icon']} icon={faDiagramProject} /><div>Active</div></Button>
                <Button ghost><FontAwesomeIcon className={styles['icon']} icon={faSpinner} /> <div>In progress</div></Button>
                <Button ghost><FontAwesomeIcon className={styles['icon']} icon={faCircleXmark} /> <div>Cancel</div></Button>
            </div>
            <div className={styles['container-actions']}>
                <Search />
                <Button primary handle={() => navigate(`${path}/create`)}>New Proyect</Button>
            </div>
        </div>
    );
}

export { NavWorkspace };