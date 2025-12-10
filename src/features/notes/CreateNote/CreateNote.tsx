import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '../../../hooks/useStorage';
import type { Note } from '../../../types/Notes';
import { NoteForm, type Empty } from '../components/NoteForm';

const noteDefault: Empty<Note> = { id: '', content: '', title: '', createdAt: '', updatedAt: '' };

const CreateNote = () => {
  const navigate = useNavigate();
  const { dispatch } = useStorage<Note>('notes');
  const [note, setNote] = useState<Note | typeof noteDefault | null>(noteDefault);
  const [saved, setSaved] = useState(false);
  const [markdownMode, setMarkdownMode] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!note?.title.trim() && !note?.content.trim()) return;

    const newNote: Note = {
      id: crypto.randomUUID(),
      title: note.title.trim() || 'Sin título',
      content: note.content.trim(),
      createdAt: note.createdAt ? note.createdAt : new Date().toISOString(),
      updatedAt: ''
    };

    dispatch({ type: 'add', payload: newNote });

    // feedback visual
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigate('/dashboard/notes');
    }, 1500);
  };

  return (
    <NoteForm
      handleSubmit={handleSubmit}
      noteState={{ note, setNote }}
      markdownState={{ markdownMode, setMarkdownMode }}
      saved={saved}
    />
  );
};

export { CreateNote };
