//* React
import {
  useReducer,
  useRef,
  type ChangeEvent,
} from "react";

//* Components
import { Button } from "../Buttons/Buttons";

//* Icons
import { Check, Pencil } from "lucide-react";

//* Styles
import styles from "./style.module.css";

//* Types
type EditableTextProps = {
  as:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "div"
    | "label";

  placeholder?: string;
  setValue: (text: string) => void;

  value?: string;
  textSize?: string;

  max?: number;
  min?: number;

  htmlFor?: string;
  notBlurEvent?: boolean;

  /**
   * Se ejecuta cuando el usuario confirma la edición.
   * EditableText no sabe qué se está guardando;
   * esa responsabilidad pertenece al componente padre.
   */
  onSave?: (text: string) => void;

  /**
   * Inicia el componente directamente en modo edición.
   */
  isEditingInitial?: boolean;
};

type State = {
  text: string;
  isEditing: boolean;
};

type Action =
  | {
      type: "change-text";
      value: string;
    }
  | {
      type: "toggle-editing";
    };

//* Reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "change-text":
      return {
        ...state,
        text: action.value,
      };

    case "toggle-editing":
      return {
        ...state,
        isEditing: !state.isEditing,
      };

    default:
      return state;
  }
};

//* Validation
const getTextColor = (
  text: string,
  min?: number,
  max?: number
): "success" | "info" | "error" => {
  const length = text.length;

  if (min !== undefined && length < min) {
    return "error";
  }

  if (max !== undefined && length > max) {
    return "error";
  }

  if (max !== undefined && length === max) {
    return "info";
  }

  return "success";
};

//* Component
const EditableText = ({
  notBlurEvent = false,
  as: Tag,
  value = "",
  placeholder = "Enter text...",
  setValue,
  textSize,
  max,
  min,
  htmlFor,
  onSave,
  isEditingInitial = false,
}: EditableTextProps) => {
  const [{ text, isEditing }, dispatch] = useReducer(
    reducer,
    {
      text: value,
      isEditing: isEditingInitial,
    }
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const color = getTextColor(text, min, max);

  const isValid =
    (min === undefined || text.length >= min) &&
    (max === undefined || text.length <= max);

  const startEditing = () => {
    dispatch({ type: "toggle-editing" });

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const save = () => {
    if (!isValid) return;

    const valueToSave = max !== undefined ? text.slice(0, max) : text;

    setValue(valueToSave);

    onSave?.(valueToSave);

    dispatch({ type: "toggle-editing" });
  };

  const handleEditable = () => {
    if (isEditing) {
      save();
      return;
    }

    if (isEditingInitial) return;

    startEditing();
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {

    const value = event.target.value;

    dispatch({
      type: "change-text",
      value,
    });
  };

  return (
    <div className={styles.editableTextContainer}>
      {isEditing && (
        <div
          className={styles.tooltip}
          style={{
            color: `var(--${color})`,
          }}
        >
          {max !== undefined
            ? `${text.length}/${max}`
            : text.length}
        </div>
      )}

      {isEditing ? (
        <input
          ref={inputRef}
          value={text}
          onChange={handleChange}
          onBlur={!notBlurEvent ? save : undefined}
          className={styles.editableTextInput}
          style={{
            fontSize: textSize,
            borderColor: `var(--${color})`,
          }}
        />
      ) : (
        <Tag
          htmlFor={htmlFor}
          className={styles.editableText}
        >
          {text || placeholder}
        </Tag>
      )}

      <Button
        color={isEditing ? "success" : "primary"}
        onClick={handleEditable}
        variant="icon"
      >
        {isEditing ? (
          <Check size={16} />
        ) : (
          <Pencil size={16} />
        )}
      </Button>
    </div>
  );
};

export { EditableText };