import styles from './progressbar.module.css';

const Progressbar = ({progress}) => {
    return (
        <div className={styles["progress"]} role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="70">
            <div className={styles["progressBar"]} style={{ width: `${progress}%` }}></div>
        </div>
    )
}

export { Progressbar };