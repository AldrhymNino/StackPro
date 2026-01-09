// Hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Styles
import styles from './style.module.css';

// Types
import type { Project, task } from '../../../types/Project';

// Components
import { Deadline } from './components/deadline/Deadline';
import { Description } from './components/description/Description';
import { Tasks } from './components/tasks/Tasks';
import { Title } from './components/title/Title';
import { Button } from '../../../components/Buttons/Buttons';
import { ArrowLeft } from 'lucide-react';
import { useProject } from '../hooks/useProject';

export const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [tasks, setTasks] = useState<task[]>([]);

  const { addProject } = useProject();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    
    e.preventDefault();
    const newProject: Pick<Project, 'title' | 'description' | 'deadline' | 'tasks'> = {
      title,
      description,
      deadline,
      tasks,
    };

    addProject(newProject);

    setTitle('');
    setDescription('');
    setDeadline('');
    setTasks([]);
    navigate('/dashboard/projects');

  };

  return (
    <div className={styles.container}>
      <Button onClick={() => window.history.back()} variant="icon">
        <ArrowLeft size={18} />
      </Button>
      <h1 className={styles.title}>Crear nuevo proyecto</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Title state={{ title, setTitle }} styles={styles} />
        <Description state={{ description, setDescription }} styles={styles} />
        <Deadline state={{ deadline, setDeadline }} styles={styles} />
        <Tasks state={{ tasks, setTasks }} styles={styles} />

        <button type="submit" className={styles.submitBtn}>
          Crear proyecto
        </button>
      </form>
    </div>
  );
};
