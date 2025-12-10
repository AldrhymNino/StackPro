import { CheckCircle2, Plus, StickyNote } from "lucide-react";
import { useState } from "react";

type TasksProps = {
    styles: { [key: string]: string };
    state: {
        tasks: { id: string; title: string; done: boolean }[];
        setTasks: React.Dispatch<React.SetStateAction<{ id: string; title: string; done: boolean }[]>>;
    }
};


const Tasks = ({styles, state}: TasksProps) => {

    const { tasks, setTasks } = state;
    const [taskInput, setTaskInput] = useState("");

    const addTask = () => {
        if (!taskInput.trim()) return;
        const newTask = {
          id: crypto.randomUUID(),
          title: taskInput.trim(),
          done: false
        };
        setTasks((prev) => [...prev, newTask]);
        setTaskInput("");
    };

    return (
        <div className={styles.field}>
          <label>
            <StickyNote size={16} /> Tareas
          </label>
          <div className={styles.taskInput}>
            <input
              type="text"
              placeholder="Escribe una tarea y presiona +"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <button type="button" onClick={addTask}>
              <Plus size={18} />
            </button>
          </div>

          <ul className={styles.taskList}>
            {tasks.map((t, i) => (
              <li key={i}>
                <CheckCircle2 size={16} /> {t.title}
              </li>
            ))}
          </ul>
        </div>
    );
};

export { Tasks };