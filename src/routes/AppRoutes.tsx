import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard as DashboardHome } from '../features/dashboard/Dashboard';
import { CreateNote } from '../features/notes/CreateNote/CreateNote';
import { EditNote } from '../features/notes/EditNote/EditNote';
import { Notes } from '../features/notes/Notes/Notes';
import { OpenNote } from '../features/notes/OpenNote/OpenNote';
import { CreateProject } from '../features/projects/CreateProject/CreateProject';
import { OpenProject } from '../features/projects/OpenProject/OpenProject';
import { Projects } from '../features/projects/Projects/Projects';
import { CreateRoadMap } from '../features/roadmap/CreateRoadMap/CreateRoadMap';
import { OpenRoadMap } from '../features/roadmap/OpenRoadMap/OpenRoadMap';
import { Roadmap } from '../features/roadmap/RoadMap/roadmap';
import { Dashboard } from '../layout/Dashboard';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/home" replace />} />

        <Route path="/dashboard" element={<Dashboard />}>
          {/* Dashboard Home */}
          <Route path="/dashboard/home" element={<DashboardHome />} />

          {/* Projects */}
          <Route path="/dashboard/projects" element={<Projects />} />
          <Route path="/dashboard/projects/:id" element={<OpenProject />} />
          <Route path="/dashboard/projects/create" element={<CreateProject />} />

          {/* Notes */}
          <Route path="/dashboard/notes" element={<Notes />} />
          <Route path="/dashboard/notes/:id" element={<OpenNote />} />
          <Route path="/dashboard/notes/create" element={<CreateNote />} />
          <Route path="/dashboard/notes/edit/:id" element={<EditNote />} />

          {/* RoadMap */}
          <Route path="/dashboard/roadmaps" element={<Roadmap />} />
          <Route path="/dashboard/roadmaps/create" element={<CreateRoadMap />} />
          <Route path="/dashboard/roadmaps/:id" element={<OpenRoadMap />} />
        </Route>
      </Routes>
    </>
  );
};

export { AppRoutes };
