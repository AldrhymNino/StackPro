import type { ReactElement } from 'react';
import styles from './style.module.css';

type EmptyProps = {
    text?: string;
    icon: ReactElement
}

const Empty = ({text, icon}: EmptyProps) => {
  return (
    <div className={styles.empty}>
        {icon}
        <p>{text}</p>
    </div>
  );
}

export { Empty };
