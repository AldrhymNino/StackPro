import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import styles from './style.module.css'; // opcional si quieres estilos
import { useNote } from '../hooks/useNote';

const OpenNote = () => {
  const { id } = useParams();
  const { current } = useNote(id);

  if (!current) {
    return <div className={styles.notFound}>Nota no encontrada 📝</div>;
  }

  return (
    <article className={styles.openNote}>
      <header className={styles.header}>
        <h1>{current.title}</h1>
      </header>

      <section className={styles.content}>
        <Markdown>{current.content}</Markdown>
      </section>
    </article>
  );
};

export { OpenNote };
