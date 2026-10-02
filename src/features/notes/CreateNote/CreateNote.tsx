// Hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNote } from '../hooks/useNote';

// Components
import { NoteForm } from '../components/NoteForm';

// Types
import type { Note } from '../../../types/Notes';
import type { FormEvent } from 'react';

const CreateNote = () => {
  const navigate = useNavigate();
  const { addNote } = useNote();
  const [note, setNote] = useState<Pick<Note, 'content' | 'title'> | null>({ content: '', title: '' });
  const [markdownMode, setMarkdownMode] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!note?.title.trim() && !note?.content.trim()) return;

    const newNote: Pick<Note, 'title' | 'content'> = {
      title: note.title.trim() || 'Sin título',
      content: note.content.trim(),
    };

    addNote(newNote);
    navigate('/dashboard/notes');
  };

  return (
    <NoteForm
      handleSubmit={handleSubmit}
      noteState={{ note, setNote }}
      markdownState={{ markdownMode, setMarkdownMode }}
    />
  );
};

export { CreateNote };
