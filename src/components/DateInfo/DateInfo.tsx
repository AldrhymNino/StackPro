// Icons
import { CalendarDays } from "lucide-react";

// Styles 
import styles from "./style.module.css";

const DateInfo = ({ date }: { date: string }) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString("es-ES", {});
    return (
        <div className={styles.dateInfo}>
            <CalendarDays size={16} />
            <span>{formattedDate}</span>
        </div>
    );
};

export { DateInfo };