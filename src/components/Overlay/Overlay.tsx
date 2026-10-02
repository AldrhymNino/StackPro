import type { ReactNode } from "react";
import { Portal } from "../Portal/Portal";

// Types
type OverlayProps = {
    children: ReactNode
}

// Styles
import styles from './style.module.css';


const Overlay = ({ children }: OverlayProps) => {
    return (
        <Portal>
            <div className={styles.overlay}>
                { children }
            </div>
        </Portal>
    );
};

export { Overlay }