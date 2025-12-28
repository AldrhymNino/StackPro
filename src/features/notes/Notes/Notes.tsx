// Components
import { Button } from '../../../components/Buttons/Buttons';
import { Search } from '../../../components/Search/Search';
import { NoteCard } from './components/NoteCard/NoteCard';
import { Empy } from '../../../components/Empy/Empy';

// icons
import { Plus, StickyNote } from 'lucide-react';

// Styles
import styles from './style.module.css';

// Hooks
import { useNavigate } from 'react-router-dom';

// types
import { useNote } from '../hooks/useNote';

const Notes = () => {
  const { filteredNotes, removeNote, keyword, setKeyword } = useNote();
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/dashboard/notes/edit/${id}`);
    console.log(id);
  };

  const handleOpen = (id: string): void => { navigate(`/dashboard/notes/${id}`); };

  return (
    <section className={styles.notesView}>
      <div className={styles.actionsGroup}>
        <Search onChange={(e) => setKeyword(e.target.value)} />
        <Button
          variant="primary-icon"
          onClick={() => navigate('/dashboard/notes/create')}
        >
          <Plus size={24} /> New Note
        </Button>
      </div>
      <div className={styles.notesGrid}>
        {filteredNotes.length === 0 && keyword ? (
          <Empy text='No hay notas disponibles con ese nombre.' icon={<StickyNote size={40}/>}/>
        ) : filteredNotes.length === 0 && keyword === '' ? (
          <Empy text='No hay notas disponibles.' icon={<StickyNote size={40}/>}/>
        ) : (
          filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={removeNote}
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
