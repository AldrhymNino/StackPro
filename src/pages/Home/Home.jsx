// Hooks
import { useNavigate } from 'react-router-dom';

// Components
import { Button, Card } from '../../components';

// Img
import preview from '../../assets/dashboard-preview.png';
import proyect from '../../assets/proyect_features.png';
import tasking from '../../assets/tasking_features.png';
import calendary from '../../assets/calendary_features.png';
import notes from '../../assets/notes_features.png';
import goals from '../../assets/goals_features.png';
import exp from '../../assets/exp_features.png';

// Style
import styles from './home.module.css';

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className={styles["landing-container"]}>
      <header className={styles["landing-header"]}>
        <h1 className={styles["logo"]}>StackPro</h1>
        <nav>
          <Button primary>Iniciar sesión</Button>
          <Button primary outlined>Registrarse</Button>
        </nav>
      </header>

      <section className={styles["hero"]}>
        <div className={styles["hero-text"]}>
          <h2>Convierte tu productividad en un juego</h2>
          <p>
            Planifica, organiza y alcanza tus metas mientras ganas experiencia y
            desbloqueas recompensas con StackPro.
          </p>
          <Button primary handle={() => { navigate('/dashboard') }}>Empezar ahora</Button>
        </div>
        <div className={styles["hero-image"]}>
          <img src={preview} alt="Vista previa StackPro" />
        </div>
      </section>

      <section className={styles["features"]}>
        <h2>¿Qué puedes hacer con StackPro?</h2>
        <div className={styles["feature-list"]}>
          <Card img={proyect}>
            <p>Crear proyectos estructurados</p>
          </Card>
          <Card img={tasking}>
            <p>Checklist de tareas con fechas</p>
          </Card>
          <Card img={goals}>
            <p>Establecer y tachar metas</p>
          </Card>
          <Card img={calendary}>
            <p>Planificar en un calendario</p>
          </Card>
          <Card img={exp}>
            <p>Aumentar de EXP y niveles</p>
          </Card>
          <Card img={notes}>
            <p>Tomar notas organizadas</p>
          </Card>
        </div>
      </section>

      <section className={styles["gamification"]}>
        <h3>Haz que cada paso cuente</h3>
        <p>
          Cada tarea completada suma puntos. Cada meta alcanzada te acerca a un
          nuevo nivel. ¡Motívate y gana recompensas personalizadas!
        </p>
      </section>

      <footer className={styles["landing-footer"]}>
        <p>© 2025 StackPro · Hecho con 💻 por Aldrhym Gabriel Niño</p>
      </footer>
    </div>
  );
};

export { Home };