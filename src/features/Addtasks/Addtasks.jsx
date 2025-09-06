// Styles
import styles from "./Addtasks.module.css";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faRemove } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../components";

// Hooks
import { useRef } from "react";

const Addtasks = ( {add, remove, task } ) => {
  const inputRef = useRef(null);

  const handleAddTask = (e) => {
    add(inputRef.current.value);
    inputRef.current.value = ""; // Clear input after adding task
  };

  const handleRemoveTask = (id) => {
    remove(id); // Call the remove function passed as prop
  };

  return (
    <div className={styles["task-container"]}>
      <h1 className={styles["task-title"]}>Task Management</h1>
      <div className={styles["div-input-addTask"]}>
        <Button
          className={styles["btn-addTask"]}
          icon
          large
          children={<FontAwesomeIcon icon={faAdd} />}
          handle={handleAddTask}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Add a new task"
          // onKeyUp={(e) => handleAddTask(e)}
          className={styles["input-addTask"]}
        />
      </div>
      <div className={styles["container-task"]}>
        {task.map(({ id, task }) => (
          <div key={id} className={styles["task-item"]}>
            <span>{task}</span>
            <Button
              handle={() => handleRemoveTask(id)}
              notHover
              className={styles["btn-removeTask"]}
              children={<FontAwesomeIcon icon={faRemove} />}
              icon
              style={{ color: "var(--error)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { Addtasks };
