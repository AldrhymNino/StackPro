// Styles
import styles from './button.module.css';
import clsx from 'clsx';

const Button = ({type, handle, children, outlined, primary, icon, floated, ghost, style, notHover }) => {

    const classes = clsx(
        styles['btn'],
        {
            [styles['outlined']]: outlined,
            [styles['primary']]: primary,
            [styles['icon']]: icon,
            [styles['floated']] :floated,
            [styles['ghost']]: ghost,
            [styles['notHover']]: notHover,
        }
    );
    
    return (
        <button type={type || 'button'} className={classes} onClick={handle} style={style}>
            { children }
        </button>
    );
};

export { Button };