// Components
import { Button, Search } from '../../components';
import { ProyectCard } from './components/proyectCard';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleXmark, faReplyAll, faSpinner } from '@fortawesome/free-solid-svg-icons';


// Hooks
import { useStorageProyects } from '../../service/useStorageProyects';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Styles
import styles from './proyects.module.css';

const Proyects = () => {
  const { state } = useStorageProyects();
  const [filterProyects, setFilterProyects] = useState("all");
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const openProyect = (proyect) => {
    navigate(`/proyects/${proyect.id}`);
  };

  const handleFilter = (valueFilter) => {
    setFilterProyects(valueFilter);
  };

  // 🔥 Generamos la lista filtrada antes del render
  const filteredProyects = state
    ?.map((proyect) => {
      const totalTasks = proyect.tasks?.length || 0;
      const completedTasks = proyect.tasks?.filter((t) => t.done).length || 0;
      const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

      return { ...proyect, progress, totalTasks, completedTasks };
    })
    ?.filter((proyect) => {
      if (filterProyects === "all") return true;
      if (filterProyects === "done") return proyect.completed;
      if (filterProyects === "progress") return proyect.progress < 100 && proyect.progress > 0;
      if (filterProyects === "cancel") return proyect.tasks?.length === 0; // ejemplo extra
      return true;
    });

  return (
    <div className={styles["proyects"]}>
      <h1>Proyects</h1>

      <div className={styles["nav-proyects"]}>
        <div className={styles["category-actions"]}>
          <Button ghost handle={() => handleFilter("done")}>
            <FontAwesomeIcon className={styles["icon"]} icon={faCheckCircle} />
            <div>Done</div>
          </Button>
          <Button ghost handle={() => handleFilter("progress")}>
            <FontAwesomeIcon className={styles["icon"]} icon={faSpinner} />
            <div>In progress</div>
          </Button>
          <Button ghost handle={() => handleFilter("cancel")}>
            <FontAwesomeIcon className={styles["icon"]} icon={faCircleXmark} />
            <div>Cancel</div>
          </Button>
          <Button ghost handle={() => handleFilter("all")}>
            <FontAwesomeIcon className={styles["icon"]} icon={faReplyAll} />
            <div>All</div>
          </Button>
        </div>

        <div className={styles["container-actions"]}>
          <Search />
          <Button primary handle={() => navigate(`${path}/create`)}>New Proyect</Button>
        </div>
      </div>

      <div className={styles["proyects_list"]}>
        {filteredProyects?.length > 0 ? (
          filteredProyects.map((proyect) => (
            <ProyectCard
              key={proyect.id}
              proyect={proyect}
              openProyect={openProyect}
              progress={proyect.progress}
            />
          ))
        ) : (
          <div className={styles["notProyect"]}>No hay proyectos.</div>
        )}
      </div>
    </div>
  );
};


export { Proyects };