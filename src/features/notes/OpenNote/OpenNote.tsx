import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { useStorage } from '../../../hooks/useStorage';
import type { Note } from '../../../types/Notes';
import styles from './style.module.css'; // opcional si quieres estilos

const OpenNote = () => {
  const { id } = useParams();
  const { state } = useStorage<Note>('notes');

  const note = state.find((n) => n.id === id);

  if (!note) {
    return <div className={styles.notFound}>Nota no encontrada 📝</div>;
  }

  return (
    <article className={styles.openNote}>
      <header className={styles.header}>
        <h1>{note.title}</h1>
      </header>

      <section className={styles.content}>
        <Markdown>{note.content}</Markdown>
      </section>
    </article>
  );
};

export { OpenNote };
