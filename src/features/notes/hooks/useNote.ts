// Hooks
import { useState } from "react";
import { useStorage } from "../../../hooks/useStorage";

// types
import type { Note } from "../../../types/Notes";

const useNote = (id?: string) => {
  const { state, dispatch } = useStorage<Note>("notes");
  const [keyword, setKeyword] = useState("");
  // const { add } = useNotification();


  const addNote = (note: Pick<Note, "title" | "content">) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...note,
    };

    dispatch({ type: "add", payload: newNote });

    // const { notification, activity } = buildEntityFeedback(
    //   "note",
    //   "created",
    //   newNote.title,
    //   newNote.id,
    // );

    // add(notification);
    // addActivity(activity);

    return newNote;
  };

  const updateNote = (updatedNote: Note) => {
    const noteToSave: Note = {
      ...updatedNote,
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: "update", payload: noteToSave });

  //   const { notification, activity } = buildEntityFeedback(
  //     "note",
  //     "updated",
  //     noteToSave.title,
  //     noteToSave.id,
  //   );

  //   add(notification);
  //   addActivity(activity);
  };

  const removeNote = (removedNote: Note) => {
    dispatch({ type: "remove", payload: removedNote });

  //   const { notification, activity } = buildEntityFeedback(
  //     "note",
  //     "deleted",
  //     removedNote.title,
  //     removedNote.id,
  //   );

  //   add(notification);
  //   addActivity(activity);
  };

  const getNoteByFilter = (): Note[] => {
    if (!keyword) return state;
    return state.filter((note) =>
      note.title.toLowerCase().includes(keyword.toLowerCase()),
    );
  };

  const getNoteById = (): Note | null => {
    return state.find((note) => note.id === id) || null;
  };

  return {
    notes: state,
    filteredNotes: getNoteByFilter(),
    current: id ? getNoteById() : null,
    addNote,
    updateNote,
    removeNote,
    keyword,
    setKeyword,
  };
};

export { useNote };
