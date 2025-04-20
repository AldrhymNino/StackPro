// Styles
import styles from './button.module.css';
import clsx from 'clsx';

const Button = ({ handle, children, outlined, rounded, primary, icon }) => {

    const classes = clsx(
        styles['btn'],
        {
            [styles['outlined']]: outlined,
            [styles['rounded']]: rounded,
            [styles['primary']]: primary,
            [styles['icon']]: icon,
        }
    );
    
    return (
        <button className={classes} onClick={handle}>
            { children }
        </button>
    );
};

export { Button };