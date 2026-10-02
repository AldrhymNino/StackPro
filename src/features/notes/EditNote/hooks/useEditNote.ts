// Hooks
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNote } from '../../hooks/useNote';

// Types
import type { Note } from '../../../../types/Notes';
import type { FormEvent } from 'react';

const useEditNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateNote, current } = useNote(id);
  const [markdownMode, setMarkdownMode] = useState(false);

  const [note, setNote] = useState<Pick<Note, "content" | "title"> | null>({
    content: current?.content || "",
    title: current?.title || "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ((!note?.title.trim() && !note?.content.trim()) || !current) return;

    const newNote: Note = {
      ...current,
      title: note.title.trim() || "Sin título",
      content: note.content.trim(),
    };

    updateNote(newNote);
    navigate("/dashboard/notes");
  };

  return { note, setNote, markdownMode, setMarkdownMode, handleSubmit, current };
};

export { useEditNote };
