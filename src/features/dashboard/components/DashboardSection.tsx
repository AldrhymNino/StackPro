import type { ReactNode } from "react";

// Styles
import styles from "../style.module.css";

type DashboardSectionProps = {
  children: ReactNode;
  description?: string;
  title: string;
  className?: string;
};

const DashboardSection = ({
  children,
  description,
  title,
  className = '',
}: DashboardSectionProps) => {
  return (
    <section className={styles.section + (className ? ` ${className}` : "")}>
      <header className={styles.sectionHeader}>
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
      </header>
      {children}
    </section>
  );
};

export { DashboardSection };
