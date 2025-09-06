// Hooks
import { useState } from "react";

// Styles
import styles from './task.module.css';

const Task = ({id, task, done, Handle }) => {
    const [checked, setChecked] = useState(done);

    const oncheck = () => {
        setChecked(!checked);
        Handle(id);
    }

    return (
        <label htmlFor={id} className={styles['task-card']}>
            <input id={id} type="checkbox" checked={done} onChange={oncheck} />
            <div>{task}</div>
        </label>
    );
}

export { Task };