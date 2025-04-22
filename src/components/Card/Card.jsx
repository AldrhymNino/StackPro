// Styles
import styles from './card.module.css';

// Utils
import clsx from 'clsx';

const Card = ({ img, children }) => {
    return (
        <div className={styles['card']}>
            {
                img

                && 
                
                <div className={styles['image-container']}>
                    <img src={img} alt="card image"/>
                </div>
            }
            <div className={styles['content-card']}>
                { children }
            </div>
        </div>
    );
}


const CardDashboard = ({ children, className }) => {
  return (
    <div className={clsx(styles['card-dashboard'], className)}>
      {children}
    </div>
  );
};

export { Card };
export { CardDashboard };