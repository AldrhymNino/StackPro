// styles
import styles from './styles.module.css';

// react / router / hooks
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/Buttons/Buttons';
import { useStorage } from '../../../hooks/useStorage';

// types
import type { Project, task } from '../../../types/Project';

// Components
import { Progressbar } from '../../../components/Progressbar/Progressbar';
import { Task } from './components/task/Task';
import { ArrowLeft } from 'lucide-react';

const OpenProject = () => {
  const { state, dispatch } = useStorage<Project>('projects');
  const navigate = useNavigate();
  const { id } = useParams();

  const [project, setProject] = useState<Project | null>(null);

  // Cargar el proyecto solo una vez
  useEffect(() => {
    const found = state.find((p) => p.id === id) || null;
    setProject(found);
  }, [id, state]);

  // Si no existe el proyecto
  if (!project) {
    return <div className={styles.notFound}>Proyecto no encontrado</div>;
  }

  // Calcular progreso
  const completedTasks = project.tasks.filter((t) => t.done).length ?? 0;
  const totalTasks = project.tasks.length ?? 0;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Alternar tarea
  const handleTaskUpdate = (taskId: string) => {
    if (!project.tasks) return;

    const updatedTasks = project.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.done } : task
    );

    const completedCount = updatedTasks.filter((t) => t.done).length;

    const newStatus: Project['status'] =
      completedCount === updatedTasks.length ? 'done' : completedCount > 0 ? 'progress' : 'pending';

    const updatedProject: Project = {
      ...project,
      tasks: updatedTasks,
      status: newStatus
    };

    setProject(updatedProject);
  };

  const handleEditTask = (id: string, newTitle: string): void => {
    const taskMap = project.tasks.map((task) => {
      return task.id === id ? { ...task, title: newTitle } : task;
    });

    const newProject = { ...project, tasks: taskMap };

    setProject(newProject);
    console.log(project);
  };

  const handleDeleteTask = (id: string): void => {
    const taskFil = project.tasks.filter((task) => task.id !== id);
    const newProject = { ...project, tasks: taskFil };
    setProject(newProject);
  };

  // Guardar o eliminar proyecto
  const handleAction = (action: 'save' | 'delete') => {
    if (!project) return;

    if (action === 'save') {
      dispatch({ type: 'update', payload: project });
    } else if (action === 'delete') {
      dispatch({ type: 'remove', payload: project });
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
          <span className={styles.status} data-status={project.status}>
            {project.status === 'done'
              ? 'Completado'
              : project.status === 'progress'
              ? 'En progreso'
              : project.status === 'canceled'
              ? 'Cancelado'
              : 'Pendiente'}
          </span>
          {project.deadline && (
            <span className={styles.deadline}>
              Límite: <b>{new Date(project.deadline).toLocaleDateString('es-CO')}</b>
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
        {project.tasks?.length === 0 ? (
          <p className={styles.empty}>No hay tareas aún.</p>
        ) : (
          <ul className={styles.taskList}>
            {project.tasks?.map((task) => (
              <Task
                key={task.id}
                task={task}
                styles={styles}
                handleChangeTask={handleTaskUpdate}
                handleEditTask={handleEditTask}
                handleDeleteTask={handleDeleteTask}
              />
            ))}
          </ul>
        )}
      </section>

      <div className={styles.group}>
        <Button onClick={() => handleAction('save')} variant="primary" style={{ width: '250px' }}>
          Guardar
        </Button>
        <Button onClick={() => handleAction('delete')} variant="error" style={{ width: '250px' }}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export { OpenProject };
