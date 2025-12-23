import type { ReactElement } from 'react';
import styles from './styles.module.css';

type EmpyProps = {
    text?: string;
    icon: ReactElement
}

const Empy = ({text, icon}: EmpyProps) => {
  return (
    <div className={styles.empty}>
        {icon}
        <p>{text}</p>
    </div>
  );
}

export { Empy };