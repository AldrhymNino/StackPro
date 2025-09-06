// Styles
import styles from './textarea.module.css';

// Hooks
import { useState } from "react";

const TextArea = ({name, value, placeholder, style }) => {
    const [valueTextarea, setValueTexarea] = useState(value|| '');
    return (
        <textarea name={name} style={style} value={valueTextarea} onChange={(e) => setValueTexarea(e.target.value)} placeholder={placeholder} className={styles["textarea"]}></textarea>
    )
}

export { TextArea }