import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStorage } from '../../../hooks/useStorage';
import type { Note } from '../../../types/Notes';
import { NoteForm } from '../components/NoteForm';

const EditNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state: notes, dispatch } = useStorage<Note>('notes');
  const [note, setNote] = useState<Note | null>(null);
  const [saved, setSaved] = useState(false);
  const [markdownMode, setMarkdownMode] = useState(false);

  useEffect(() => {
    const foundNote = notes.find((n) => String(n.id) === String(id)) || null;
    setNote(foundNote);
  }, [notes, id]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!note?.title.trim() && !note?.content.trim()) return;

    const newNote: Note = {
      id: note?.id,
      title: note?.title.trim() || 'Sin título',
      content: note?.content.trim(),
      updatedAt: new Date().toISOString(),
      createdAt: note?.createdAt
    };

    dispatch({ type: 'update', payload: newNote });

    // feedback visual
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigate('/dashboard/notes');
    }, 1500);
  };

  console.log(id, note?.id, note, `Son iguales?: ${id === note?.id ? 'true' : 'false'}`);

  if (!note) return <p style={{ textAlign: 'center' }}>Esta nota no existe</p>;

  return (
    <NoteForm
      handleSubmit={handleSubmit}
      noteState={{ note, setNote }}
      markdownState={{ markdownMode, setMarkdownMode }}
      saved={saved}
    />
  );
};

export { EditNote };
