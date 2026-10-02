import Markdown from 'react-markdown';

// Icons
import { StickyNote } from 'lucide-react';

// Hooks
import { useParams } from 'react-router-dom';
import { useNote } from '../hooks/useNote';

// Components
import { Empty } from '../../../components/Empty/Empty';

// styles
import styles from './style.module.css';

const OpenNote = () => {
  const { id } = useParams();
  const { current } = useNote(id);

  if (!current) {
    return <Empty icon={<StickyNote size={40} />} text='Nota no encontrada' />;
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
