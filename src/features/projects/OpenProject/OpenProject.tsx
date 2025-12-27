// styles
import styles from './styles.module.css';

// react / router
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// components
import { Button } from '../../../components/Buttons/Buttons';
import { Progressbar } from '../../../components/Progressbar/Progressbar';
import { Task } from './components/task/Task';
import { ArrowLeft } from 'lucide-react';

// hooks
import { useProject } from '../hooks/useProject';
import { useProjectTasks } from './hooks/useProjectTasks';
import { useProjectProgress } from './hooks/useProjectProgress';

// types
import type { Project, task } from '../../../types/Project';

const OpenProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { updateProject, removeProject, currentProject } = useProject(id);
  const [project, setProject] = useState<Project | null>(currentProject);

  const { toggleTask, editTask, deleteTask } =
    useProjectTasks(project, setProject);

  // ⛔ Proyecto no encontrado
  if (!project) {
    return <div className={styles.notFound}>Proyecto no encontrado</div>;
  }

  // ✅ Progreso calculado por hook
  const { progress, status } = useProjectProgress(project.tasks);

  // Guardar o eliminar proyecto
  const handleAction = (action: 'save' | 'delete') => {
    if (action === 'save') {
      updateProject(project);
    } else {
      removeProject(project);
    }

    navigate('/dashboard/projects');
  };

  return (
    <div className={styles.openProject}>
      <Button onClick={() => window.history.back()} variant="icon">
        <ArrowLeft size={18} />
      </Button>

      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>

        <div className={styles.meta}>
          <span className={styles.status} data-status={status}>
            {status}
          </span>

          {project.deadline && (
            <span className={styles.deadline}>
              Límite:{' '}
              <b>{new Date(project.deadline).toLocaleDateString('es-CO')}</b>
            </span>
          )}
        </div>
      </header>

      <section className={styles.progressSection}>
        <label>Progreso: {progress}%</label>
        <Progressbar<task> list={project.tasks} />
      </section>

      <section className={styles.tasks}>
        <h2>Tareas</h2>

        {project.tasks.length === 0 ? (
          <p className={styles.empty}>No hay tareas aún.</p>
        ) : (
          <div className={styles.taskList}>
            {project.tasks.map(task => (
              <Task
                key={task.id}
                task={task}
                styles={styles}
                handleChangeTask={toggleTask}
                handleEditTask={editTask}
                handleDeleteTask={deleteTask}
              />
            ))}
          </div>
        )}
      </section>

      <div className={styles.group}>
        <Button
          onClick={() => handleAction('save')}
          variant="primary"
          style={{ width: '250px' }}
        >
          Guardar
        </Button>

        <Button
          onClick={() => handleAction('delete')}
          variant="error"
          style={{ width: '250px' }}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export { OpenProject };
