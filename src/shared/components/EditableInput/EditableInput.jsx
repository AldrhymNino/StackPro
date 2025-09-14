// utils
import clsx from "clsx";

// Components
import { Button } from "../../../components";

// styles
import styles from "./editableInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// Icons
import { faPencil, faCheck } from "@fortawesome/free-solid-svg-icons";

// Hooks
import { useEffect, useRef, useState } from "react";

const EditableInput = ({ type, name, placeholder, value, className, handleChange}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [valueInput, setValueInput] = useState(value || '');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  }


  return (
    <div style={{borderBottomColor: !isEditing || 'var(--background2)'}} className={styles['editable-input']}>
      {
        isEditing ? (
          <input
            autoComplete="off"
            type={type}
            name={name}
            ref={inputRef}
            className={`${styles['input']} ${className ? className : ''}`}
            placeholder={placeholder}
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && toggleEditing()}
          />
        ) : (
          <h2 className={className}>{valueInput}</h2>
        )
      }
      <Button icon handle={() => {
          toggleEditing();
          if (isEditing) handleChange(valueInput);
        }}>
        <FontAwesomeIcon icon={isEditing ? faCheck : faPencil} size="lg" />
      </Button>
    </div>
  );
};

export { EditableInput };