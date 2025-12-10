import type { ReactElement } from "react";

// styles
import styles from './style.module.css'

type MainProps = {
  outlet: ReactElement | null;
};

const Main = ({ outlet }: MainProps) => {
    return (
        <main className={styles.main}>
            { outlet }
        </main>
    );
}

export { Main }