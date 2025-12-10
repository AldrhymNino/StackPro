import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../../../components/Buttons/Buttons';
import type { task } from '../../../../../types/Project';

type TaskProps = {
  styles: { [key: string]: string };
  task: task;
  handleChangeTask: (id: string) => void;
  handleDeleteTask: (id: string) => void;
  handleEditTask: (id: string, newTitle: string) => void;
};

const Task = ({ styles, task, handleChangeTask, handleDeleteTask, handleEditTask }: TaskProps) => {
  const { completed, id, title } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleBlur = () => {
    if (editValue.trim() !== '') {
      setIsEditing(false);
      handleEditTask(id, editValue.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleBlur();
  };

  return (
    <li
      onClick={() => handleChangeTask(id)}
      key={id}
      className={`${styles.task} ${completed ? styles.completed : ''}`}
    >
      <input
        className={styles.checkbox}
        id={`task${id}`}
        type="checkbox"
        checked={completed}
        onChange={() => handleChangeTask(id)}
      />

      {isEditing ? (
        <input
          className={styles.editInput}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <label htmlFor={`task${id}`} onClick={(e) => !isEditing && e.preventDefault()}>
          {title}
        </label>
      )}

      <div className={styles.group}>
        <Button
          variant="icon"
          className={styles.editBtn}
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(!isEditing);
          }}
        >
          <Pencil size={16} />
        </Button>

        <Button variant="icon" className={styles.deleteBtn} onClick={() => handleDeleteTask(id)}>
          <Trash2 size={16} />
        </Button>
      </div>
    </li>
  );
};

export { Task };
