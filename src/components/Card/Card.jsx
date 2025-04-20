// Hooks
import { useRef } from 'react';
import { useEffect } from 'react';

// Styles
import styles from './card.module.css';

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
                <p>
                    { children }
                </p>
            </div>
        </div>
    );
}


const CardDashboard = ({ children }) => {
  return (
    <div className={styles['card-dashboard']}>
      {children}
    </div>
  );
};

export { Card };
export { CardDashboard };