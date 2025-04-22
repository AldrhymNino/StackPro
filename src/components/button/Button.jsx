// Styles
import styles from './button.module.css';
import clsx from 'clsx';

const Button = ({ handle, children, outlined, rounded, primary, icon, floated, ghost }) => {

    const classes = clsx(
        styles['btn'],
        {
            [styles['outlined']]: outlined,
            [styles['rounded']]: rounded,
            [styles['primary']]: primary,
            [styles['icon']]: icon,
            [styles['floated']] :floated,
            [styles['ghost']]: ghost,
        }
    );
    
    return (
        <button className={classes} onClick={handle}>
            { children }
        </button>
    );
};

export { Button };