import { useState } from "react";
import { useStorage } from "../../../hooks/useStorage"
import type { Note } from "../../../types/Notes";
import { useNotification } from "../../../context/notificationsContext";

const useNote = (id?: string) => {
    const { state, dispatch } = useStorage<Note>('notes');
    const [keyword, setKeyword] =  useState('');
    const { add } = useNotification();

    const addNote = (note: Pick<Note, 'title' | 'content'>) => {

        const newNote: Note = {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...note,
        };
        
        dispatch({ type: 'add', payload: newNote });

        add({
            title: 'Nota creada',
            message: 'La nota "' + note.title + '" ha sido creada exitosamente.',
            type: 'success',
            entity: {
                type: 'note',
                id: newNote.id
            }
        });
      };


    const updateNote = (updatedNote: Note) => {
        dispatch({ type: 'update', payload: updatedNote });
        add({
            title: 'Nota Actualizada',
            message: 'La nota "' + updatedNote.title + '" ha sido actualizada exitosamente.',
            type: 'info',
            entity: {
                type: 'note',
                id: updatedNote.id
            }
        });
      }

    const removeNote = (removedNote: Note) => {
      dispatch({ type: 'remove', payload: removedNote });
      add({
          title: 'Nota Eliminada',
          message: 'La nota "' + removedNote.title + '" ha sido eliminada exitosamente.',
          type: 'error',
          entity: {
              type: 'note',
              id: removedNote.id
          }
      });
    }

    const getNoteByFilter = (): Note[] => {
        if (!keyword) return state;
        return state.filter(note => note.title.toLowerCase().includes(keyword.toLowerCase()));
    };

    const getNoteById = (): Note | null => {
        return state.find(note => note.id === id) || null;
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
    }


}

export { useNote };