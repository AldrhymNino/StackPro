import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Note } from '../../../types/Notes';
import { NoteForm } from '../components/NoteForm';
import { useNote } from '../hooks/useNote';

const EditNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateNote, current } = useNote(id);
  const [note, setNote] = useState<Pick<Note, 'content' | 'title'> | null>({ content: current?.content || '', title: current?.title || '' });
  const [markdownMode, setMarkdownMode] = useState(false);


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ((!note?.title.trim() && !note?.content.trim()) || !current) return;

    const newNote: Note = {
      ...current,
      title: note.title.trim() || 'Sin título',
      content: note.content.trim(),
    };

    updateNote(newNote);
    navigate('/dashboard/notes');
  };

  if (!current) return <p style={{ textAlign: 'center' }}>Esta nota no existe</p>;

  return (
    <NoteForm
      handleSubmit={handleSubmit}
      noteState={{ note, setNote }}
      markdownState={{ markdownMode, setMarkdownMode }}
    />
  );
};

export { EditNote };
