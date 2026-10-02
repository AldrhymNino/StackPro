// Icons
import { X } from "lucide-react";

// Components
import { Button } from "../Buttons/Buttons";
import { Portal } from "../Portal/Portal";

// Styles
import styles from "./style.module.css";

// Types
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <Button
              variant="icon"
              className={styles.closeButton}
              onClick={onClose}
            >
              <X />
            </Button>
          </div>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </Portal>
  );
};

export { Modal };
