// Style
import styles from './card.module.css';

const Card = ({ head, children }) => {
    return (
        <div className={styles['card']}>
            <div className={styles['head-card']}>
                { head }
            </div>
            <div className={styles['content-card']}>
                <p>
                    { children }
                </p>
            </div>
        </div>
    );
}

export { Card };