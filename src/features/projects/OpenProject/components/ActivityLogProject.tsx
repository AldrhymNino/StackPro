// Components
import { ActivityLogItem } from '../../../../components/ActivityItem/ActivityItem';

// Context
import { useOpenProjectContext } from '../../context/useOpenProjectContext';

// Styles
import styles from '../style.module.css';

const ActivityLogProject = () => {
    const { project } = useOpenProjectContext();
    return (
        <div className={styles.activityLogProject}>
            <h4>Actividad Reciente</h4>
            <div className={styles.activityList}>
                {project?.activityLog.map(activity => <ActivityLogItem key={activity.id} activity={activity} /> )}
            </div>
        </div>
    );
};

export { ActivityLogProject };