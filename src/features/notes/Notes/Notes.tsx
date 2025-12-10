// Components
import { useState } from 'react';
import { Button } from '../../../components/Buttons/Buttons';
import { Search } from '../../../components/Search/Search';
import { NoteCard } from './components/NoteCard/NoteCard';

// icons
import { Plus } from 'lucide-react';

// Styles
import styles from './style.module.css';

// Hooks
import { useNavigate } from 'react-router-dom';
import { useStorage } from '../../../hooks/useStorage';

// types
import type { Note } from '../../../types/Notes';

const Notes = () => {
  const [search, setSearch] = useState('');
  const { state: notes, dispatch: setNote } = useStorage<Note>('notes');
  const navigate = useNavigate();

  const filterRender = () => {
    const nt = notes;
    const ntFilter = nt.filter(({ title }) => title.trim().toLowerCase().includes(search));
    return ntFilter;
  };

  const handleDelete = (note: Note) => {
    setNote({ type: 'remove', payload: note });
  };

  const handleEdit = (id: string) => {
    navigate(`/dashboard/notes/edit/${id}`);
  };

  const handleOpen: (id: string) => void = (id) => navigate(`/dashboard/notes/${id}`);

  return (
    <section className={styles.notesView}>
      <h1>Tus notas</h1>
      <div className={styles.actionsGroup}>
        <Button
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--text-light)',
            width: '40px',
            height: '40px'
          }}
          variant="icon"
          onClick={() => navigate('/dashboard/notes/create')}
        >
          <Plus size={24} />
        </Button>
        <Search onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className={styles.notesGrid}>
        {filterRender().length === 0 && search ? (
          <p className={styles.empty}>No hay notas disponibles con ese nombre.</p>
        ) : filterRender().length === 0 && search === '' ? (
          <p className={styles.empty}>No hay notas aún...</p>
        ) : (
          filterRender().map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onOpen={handleOpen}
            />
          ))
        )}
      </div>
    </section>
  );
};

export { Notes };
