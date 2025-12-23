// DashboardHome.tsx
import {
  CheckCircle,
  ClipboardList,
  Eye,
  Loader2,
  MapIcon,
  PlusCircle,
  Settings,
  StickyNote
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Buttons/Buttons';
import { useStorage } from '../../hooks/useStorage';
import styles from './style.module.css';

// Type
import type { Project } from '../../types/Project';
import type { Roadmap } from '../../types/Roadmap';

const Dashboard = () => {
  const { state: project } = useStorage<Project>('projects');
  const { state: roadmap } = useStorage<Roadmap>('roadmap');
  const navigate = useNavigate();

  // Contar los proyectos por estado
  const statsProject = project.reduce(
    (acc, project) => {
      switch (project.status) {
        case 'done':
          acc.completados++;
          break;
        case 'progress':
          acc.progreso++;
          break;
        case 'pending':
          acc.pendientes++;
          break;
        default:
          break;
      }
      return acc;
    },
    { progreso: 0, completados: 0, pendientes: 0 }
  );

  const stats = [
    {
      title: 'Proyectos En progreso',
      value: statsProject.progreso,
      icon: <Loader2 />,
      color: 'var(--info)'
    },
    {
      title: 'Proyectos Completados',
      value: statsProject.completados,
      icon: <CheckCircle />,
      color: 'var(--success)'
    },
    {
      title: 'Proyectos Pendientes',
      value: statsProject.pendientes,
      icon: <ClipboardList />,
      color: 'var(--warning)'
    },
    {
      title: 'Roadmaps',
      value: roadmap.length,
      icon: <MapIcon />,
      color: 'var(--secondary)'
    }
  ];

  const actions = [
    {
      label: 'Ver Proyectos',
      icon: <Eye size={18} style={{ marginRight: 8 }} />,
      path: '/dashboard/projects'
    },
    {
      label: 'Crear Proyecto',
      icon: <PlusCircle size={18} style={{ marginRight: 8 }} />,
      path: '/dashboard/projects/create'
    },
    {
      label: 'Ver Notas',
      icon: <StickyNote size={18} style={{ marginRight: 8 }} />,
      path: '/dashboard/notes'
    },
    {
      label: 'Crear Nota',
      icon: <PlusCircle size={18} style={{ marginRight: 8 }} />,
      path: '/dashboard/notes/create'
    },
    {
      label: 'Configuración',
      icon: <Settings size={18} style={{ marginRight: 8 }} />,
      path: '/dashboard/settings'
    },
  ];

  return (
    <>
      <h2>Dashboard</h2>
      <section className={styles.dashboardHome}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.card}>
            <div
              className={styles.iconWrapper}
              style={{
                background: `color-mix(in srgb, ${stat.color} 25%, transparent)`,
                color: stat.color
              }}
            >
              {stat.icon}
            </div>
            <div className={styles.info}>
              <h3>{stat.title}</h3>
              <span>{stat.value}</span>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.divider}>
        <h2>¿Qué quieres hacer hoy?</h2>
        <div className={styles.buttonContainer}>
          {actions.map(({ icon, label, path }) => (
            <Button variant="primary-icon" onClick={() => navigate(path)}>
              {icon} <span>{label}</span>
            </Button>
          ))}
        </div>
      </section>
    </>
  );
};

export { Dashboard };

