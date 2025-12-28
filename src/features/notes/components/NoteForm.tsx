// Hooks
import { useEffect, useRef } from 'react';

// types
import type { Dispatch, FormEvent, SetStateAction } from 'react';
import type { Note } from '../../../types/Notes';

// Styles
import Markdown from 'react-markdown';
import styles from './style.module.css';
import { Button } from '../../../components/Buttons/Buttons';
import { ArrowLeft } from 'lucide-react';

// TypeProp
export type Empty<T> = { [K in keyof T]: '' };

type NoteFormProps = {
  markdownState: {
    markdownMode: boolean;
    setMarkdownMode: Dispatch<SetStateAction<boolean>>;
  };

  noteState: {
    note: Note | Pick<Note, 'title' | 'content'> | null;
    setNote: Dispatch<SetStateAction<NoteFormProps['noteState']['note']>>;
  };

  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const NoteForm = ({ markdownState, noteState, handleSubmit }: NoteFormProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { markdownMode, setMarkdownMode } = markdownState;
  const { note, setNote } = noteState;

  // Auto-resize del textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [note?.content, note?.title]);

  return (
    <form className={styles.noteForm} onSubmit={handleSubmit}>
      <Button onClick={() => window.history.back()} variant="icon">
        <ArrowLeft size={18} />
      </Button>
      <header className={styles.noteHeader}>
        <h2 className={styles.noteHeading}>🪶 Nueva nota</h2>

        <div className={styles.switchWrapper}>
          <span>Vista Markdown</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={markdownMode}
              onChange={() => setMarkdownMode((prev) => !prev)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </header>

      <input
        className={styles.noteTitle}
        type="text"
        placeholder="Título de la nota..."
        value={note?.title}
        onChange={(e) => setNote((prev) => ({ ...prev!, title: e.target.value }))}
      />

      {/* Editor / Vista Markdown */}
      {!markdownMode ? (
        <textarea
          ref={textareaRef}
          className={styles.noteContent}
          placeholder="Escribe aquí tus ideas..."
          value={note?.content}
          onChange={(e) => setNote((prev) => ({ ...prev!, content: e.target.value }))}
        />
      ) : (
        <div className={styles.editorPreviewContainer}>
          <textarea
            ref={textareaRef}
            className={`${styles.noteContent} ${styles.editorBlock}`}
            placeholder="Escribe en Markdown..."
            value={note?.content}
            onChange={(e) => setNote((prev) => ({ ...prev!, content: e.target.value }))}
          />

          <div className={`${styles.markdownPreview} ${styles.previewBlock}`}>
            <Markdown>{note?.content || '_Escribe algo para ver la vista previa_'}</Markdown>
          </div>
        </div>
      )}

      <div className={styles.noteFooter}>
        <span className={styles.noteHint}>
          ✨ Inspírate y escribe libremente
        </span>
        <button type="submit" className={styles.noteButton}>
          Guardar
        </button>
      </div>
    </form>
  );
};

export { NoteForm };
