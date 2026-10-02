// Styles
import clsx from 'clsx';
import styles from '../style.module.css';

// Types
type ModalProps = {
    show: boolean
}

const ModalFocusMode = ({ show }: ModalProps) => {
    return (
        <div className={clsx(styles.modal, {
            [styles.show]: show
        })} >
            <h1>Hola!!!</h1>
        </div>
    );
};

export { ModalFocusMode };