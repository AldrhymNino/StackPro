// Components
import { Button } from "../../components";
import { TextArea } from "../../shared";
import { Addtasks } from "../Addtasks/Addtasks.jsx";

// Styles
import styles from './createproyects.module.css';

// Utils
import { date } from "../../utils/date";

// Hooks
import { useState } from "react";
import { useStorageProyects } from "../../service/useStorageProyects";
import { useNavigate } from "react-router-dom";

// Model
import { proyectModel } from "../../models/proyectsModel.js";
import { tasksModel } from "../../models/tasksModel.js";

const Createproyects = () => {
    const { dispatch }= useStorageProyects();
    const navigate = useNavigate();
    const [proyect, setProyect] = useState(proyectModel());


    const createProyect = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        const title = formdata.get('title');
        const description = formdata.get('description');

        const newProyect = {
            ...proyect, // conservar cosas del estado anterior
            title,
            description,
            created: date()
        };

        setProyect(newProyect);
        dispatch({ type: 'add', payload: newProyect });
        navigate('/proyects');
    }


    const addTask = (task) => {
        setProyect((prev) => ({
            ...prev,
            tasks: [...prev.tasks, {...tasksModel(), task}]
        }));
    }

    const removeTask = (_id) => {
        setProyect((prev) => ({
            ...prev,
            tasks: prev.tasks.filter(({ id }) => id !== _id)
        }));
    }


    return (
        <form onSubmit={(e) => createProyect(e)} className={styles['container-create-proyects']}>
            <h1>Create Proyect</h1>
            <input autoComplete="off" className={styles['input']}  name='title' type='text' placeholder='Nombre del proyecto' />
            <TextArea name='description' style={{marginBottom: '50px'}} placeholder='Descripción del proyecto' />
            <Addtasks task={proyect.tasks} add={addTask} remove={removeTask} />
            <Button type='submit' primary children={'Crear Proyecto'} style={{width: '100%', maxWidth: '700px'}} />
        </form>
    );
};

export { Createproyects };