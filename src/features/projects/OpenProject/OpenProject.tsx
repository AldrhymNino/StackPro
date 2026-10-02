// Components
import { OpenProjectContainer } from "./components/OpenProjectContainer";

// Provider Context 
import { ProjectProvider } from "../context/ProjectProvider";

const OpenProject = () => {
  return (
    <ProjectProvider>
      <OpenProjectContainer />
    </ProjectProvider>
  );
};

export { OpenProject };
