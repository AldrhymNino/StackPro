import type { ReactElement } from "react";
import { motion } from "framer-motion";
import styles from './style.module.css'

type MainProps = {
  outlet: ReactElement | null;
};

const Main = ({ outlet }: MainProps) => {
    return (
        <motion.main 
            className={styles.main}
            initial={{ opacity: 0, y: 40, scale: 0.75 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            { outlet }
        </motion.main>
    );
}

export { Main }