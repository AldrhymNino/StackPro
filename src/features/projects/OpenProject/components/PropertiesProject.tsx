import { useState } from 'react';

// Constants
import { priorities, priorityStyles } from '../constants/priority';

// Icon
import { ChevronDown, ChevronUp } from 'lucide-react';

// Components
import { Dropdown } from '../../../../components/Dropdown/Dropdown';

// Style
import styles from '../style.module.css';
import type { Priority } from '../../../../types/Project';
import { useOpenProjectContext } from '../../context/useOpenProjectContext';
import { DateInfo } from '../../../../components/DateInfo/DateInfo';

const stylePriority = (priority: Priority): React.CSSProperties => ({
    width: '100%',
    color: `var(--${priorityStyles[priority]})`,
    border: `1px solid var(--${priorityStyles[priority]})`,
    backgroundColor: `var(--${priorityStyles[priority]}-soft)`,
    borderRadius: 'var(--radius-sm)',
    padding: '0.2rem 0.5rem',
    justifyContent: 'space-between',
});


const PropertiesProject = () => {
    const { dispatchProject, project } = useOpenProjectContext();
    const [showOptions, setShowOptions] = useState(false);

    if (!project) return null;

    const {createdAt, updatedAt, priority } = project;

    const handlerPriority = (op: Priority) => {
      dispatchProject({ type: 'set-priority', value: op });
    }

    return (
        <div className={styles.propertiesProject}>
            <h4>Informacion De Proyecto</h4>
            <div className={styles.propertiesItem}>
                <p>Creado el</p>
                <DateInfo date={createdAt} />
            </div>
            <div className={styles.propertiesItem}>
                <p>Ultima Actualización</p>
                <DateInfo date={updatedAt} />
            </div>
            <div className={styles.propertiesItem}>
                <p>Prioridad</p>
                <Dropdown renderValue={(priority) => (
                    <div style={stylePriority(priority)}>
                        <span className={styles.priorityValue}>{priority}</span>
                        {showOptions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                )} position='bottom' onClick={handlerPriority} handlerOptions={{showOptions, setShowOptions}} options={priorities}  value={priority} />
            </div>
        </div>
    );
};

export { PropertiesProject }
