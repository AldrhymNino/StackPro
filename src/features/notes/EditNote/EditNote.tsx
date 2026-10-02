// Icons
import { StickyNote } from 'lucide-react';

// Components
import { Empty } from '../../../components/Empty/Empty';
import { NoteForm } from '../components/NoteForm';

// Hooks
import { useEditNote } from './hooks/useEditNote';

const EditNote = () => {
  const { setNote, markdownMode, setMarkdownMode, handleSubmit, current, note } = useEditNote();

  if (!current) return <Empty icon={<StickyNote size={40}/>} text='No existe la nota'/>;

  return (
    <NoteForm
      handleSubmit={handleSubmit}
      noteState={{ note, setNote }}
      markdownState={{ markdownMode, setMarkdownMode }}
    />
  );
};

export { EditNote };
