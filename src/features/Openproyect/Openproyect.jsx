// hooks
import { useParams } from "react-router-dom";
import { useStorageProyects } from "../../service/useStorageProyects";

// Components
import { EditableInput } from "../../shared";
import { Progressbar } from "../../components";
import { Task } from "./components/Task/Task.jsx";

// Styles
import styles from './openproyect.module.css';

const Openproyect = () => {
    const { proyectId } = useParams();
    const {state, dispatch} = useStorageProyects();

    const proyect = state.find(p => p.id == proyectId);

    if (!proyect) return <div className="error">Project not found</div>;

    const { title, description, tasks } = proyect;

    // Calcular progreso
    const totalTasks = proyect.tasks?.length || 0;
    const completedTasks = proyect.tasks?.filter((t) => t.done).length || 0;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const onCheck = (id) => {
        const updatedTasks = proyect.tasks.map(task => 
            task.id === id ? { ...task, done: !task.done } : task
        );

        const updatedproyect = { ...proyect, tasks: updatedTasks };

        const allTaskTrue = updatedTasks.every(task => task.done);

        updatedproyect.completed = allTaskTrue;

        dispatch({ type: 'update', payload: updatedproyect});
    }

    const onChangeTitle = (newTitle) => {
        const updatedproyect = { ...proyect, title: newTitle };
        dispatch({ type: 'update', payload: updatedproyect });
    };


    return (
        <div className={styles["container-open-proyect"]}>
            <EditableInput handleChange={onChangeTitle} className={styles['title']} value={title} name='title' type='text' placeholder='Nombre del proyecto' />
            <p className={styles['description']}>{description}</p>
            <Progressbar progress={progress} />
            <h2 className={styles['tasks-title']}>Tasks</h2>
            <div className={styles['tasks-section']}>
                {tasks && tasks.map(({id, task, done}) => (
                    <Task key={id} id={id} task={task} done={done} Handle={onCheck} />
                ))}
            </div>
        </div>
    );
};

export { Openproyect };