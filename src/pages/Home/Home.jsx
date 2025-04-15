import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="logo">StackPro</h1>
        <nav>
          <button className="btn">Iniciar sesión</button>
          <button className="btn btn-primary">Registrarse</button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h2>Convierte tu productividad en un juego</h2>
          <p>
            Planifica, organiza y alcanza tus metas mientras ganas experiencia y
            desbloqueas recompensas con StackPro.
          </p>
          <button className="btn btn-primary">Empezar ahora</button>
        </div>
        <div className="hero-image">
          <img src="/assets/dashboard-preview.png" alt="Vista previa StackPro" />
        </div>
      </section>

      <section className="features">
        <h3>¿Qué puedes hacer con StackPro?</h3>
        <div className="feature-list">
          <div className="feature">🧩 Crear proyectos estructurados</div>
          <div className="feature">✅ Checklist de tareas con fechas</div>
          <div className="feature">🎯 Establecer y tachar metas</div>
          <div className="feature">📅 Planificar en un calendario</div>
          <div className="feature">🌟 Sistema de EXP y niveles</div>
          <div className="feature">💡 Tomar notas organizadas</div>
        </div>
      </section>

      <section className="gamification">
        <h3>Haz que cada paso cuente</h3>
        <p>
          Cada tarea completada suma puntos. Cada meta alcanzada te acerca a un
          nuevo nivel. ¡Motívate y gana recompensas personalizadas!
        </p>
      </section>

      <footer className="landing-footer">
        <p>© 2025 StackPro · Hecho con 💻 por Aldrin Gabriel Niño</p>
      </footer>
    </div>
  );
};

export { Home };