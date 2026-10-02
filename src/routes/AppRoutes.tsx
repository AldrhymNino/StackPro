import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Dashboard as DashboardHome } from '../features/dashboard/Dashboard';
import { DashboardLayout } from '../layout/DashboardLayout';

/*
 * Code splitting — cada página vive en su propio chunk (archivo JS)
 * y solo se descarga cuando el usuario visita su ruta.
 *
 * El Dashboard home se mantiene eager (carga normal) para que la
 * primera carga de la app sea instantánea, sin spinner.
 *
 * Como las páginas usan export nombrado, se adapta a default
 * con .then((m) => ({ default: m.X })) para que React.lazy lo entienda.
 */

// Projects
const Projects = lazy(() =>
  import('../features/projects/Projects/Projects').then((m) => ({
    default: m.Projects,
  })),
);

const OpenProject = lazy(() =>
  import('../features/projects/OpenProject/OpenProject').then((m) => ({
    default: m.OpenProject,
  })),
);

// Notes
const Notes = lazy(() =>
  import('../features/notes/Notes/Notes').then((m) => ({
    default: m.Notes,
  })),
);

const OpenNote = lazy(() =>
  import('../features/notes/OpenNote/OpenNote').then((m) => ({
    default: m.OpenNote,
  })),
);

const CreateNote = lazy(() =>
  import('../features/notes/CreateNote/CreateNote').then((m) => ({
    default: m.CreateNote,
  })),
);

const EditNote = lazy(() =>
  import('../features/notes/EditNote/EditNote').then((m) => ({
    default: m.EditNote,
  })),
);

// Roadmaps
const Roadmap = lazy(() =>
  import('../features/roadmap/RoadMap/Roadmap').then((m) => ({
    default: m.Roadmap,
  })),
);

const CreateRoadMap = lazy(() =>
  import('../features/roadmap/CreateRoadMap/CreateRoadMap').then((m) => ({
    default: m.CreateRoadMap,
  })),
);

const OpenRoadMap = lazy(() =>
  import('../features/roadmap/OpenRoadMap/OpenRoadMap').then((m) => ({
    default: m.OpenRoadMap,
  })),
);

// Demo
const StackProApp = lazy(() => import('../features/demo/StackProApp'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard/home" replace />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Dashboard Home */}
        <Route path="/dashboard/home" element={<DashboardHome />} />

        {/* Projects */}
        <Route path="/dashboard/projects" element={<Projects />} />
        <Route path="/dashboard/projects/:id" element={<OpenProject />} />

        {/* Notes */}
        <Route path="/dashboard/notes" element={<Notes />} />
        <Route path="/dashboard/notes/:id" element={<OpenNote />} />
        <Route path="/dashboard/notes/create" element={<CreateNote />} />
        <Route path="/dashboard/notes/edit/:id" element={<EditNote />} />

        {/* RoadMap */}
        <Route path="/dashboard/roadmaps" element={<Roadmap />} />
        <Route path="/dashboard/roadmaps/create" element={<CreateRoadMap />} />
        <Route path="/dashboard/roadmaps/:id" element={<OpenRoadMap />} />

        {/* Demo */}
        <Route path="/dashboard/demo" element={<StackProApp />} />
      </Route>
    </Routes>
  );
};

export { AppRoutes };
