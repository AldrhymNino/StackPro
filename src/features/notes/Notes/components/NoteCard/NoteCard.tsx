// icons
import { Edit3, StickyNote, Trash2 } from 'lucide-react';

// styles
import styles from '../../style.module.css';

// types
import type { Note } from '../../../../../types/Notes';

// typeprops
type Props = {
  note: Note;
  onDelete: (note: Note) => void;
  onEdit: (id: string) => void;
  onOpen: (id: string) => void;
};

const NoteCard = ({ note, onDelete, onEdit, onOpen }: Props) => {
  return (
    <article className={styles.noteCard} onClick={() => onOpen(note.id)}>
      <header>
        <h2>
          <StickyNote size={18} style={{ marginRight: 8 }} />
          {note.title}
        </h2>
      </header>

      <p className={styles.content}>
        {note.content.length > 120 ? note.content.slice(0, 120) + '...' : note.content}
      </p>

      <footer>
        <small className={styles.date}>
          Creada el {new Date(note.createdAt).toLocaleDateString()}
        </small>
        {note.updatedAt && (
          <small className={styles.date}>
            Modificada el {new Date(note.updatedAt).toLocaleDateString()}
          </small>
        )}
        <div className={styles.actions}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note.id);
            }}
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note);
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </footer>
    </article>
  );
};

export { NoteCard };
