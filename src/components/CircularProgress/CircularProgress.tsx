// CircularProgress.tsx

import { motion } from 'framer-motion';
import styles from './style.module.css';

type CircularProgressProps = {
  progress: number;
  size?: number;
  strokeWidth?: number;
};

const CircularProgress = ({
  progress,
  size = 90,
  strokeWidth = 8,
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;

  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (Math.min(progress, 100) / 100) * circumference;

  return (
    <div
      className={styles.container}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={styles.backgroundCircle}
          strokeWidth={strokeWidth}
          fill="none"
        />

        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={styles.progressCircle}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: offset,
          }}
          transition={{
            duration: 1,
            ease: 'easeOut',
          }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      <motion.span
        className={styles.percentage}
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 0.2,
        }}
      >
        {progress}%
      </motion.span>
    </div>
  );
};

export { CircularProgress };