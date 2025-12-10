import { CalendarDays } from "lucide-react";

type DeadlineProps = {
    styles: { [key: string]: string };
    state: {
        deadline: string;
        setDeadline: React.Dispatch<React.SetStateAction<string>>;
    };
};

const Deadline = ({styles, state}: DeadlineProps) => {

    const { deadline, setDeadline } = state;

    return(
        <div className={styles.field}>
          <label>
            <CalendarDays size={16} /> Fecha límite
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
    )
};

export { Deadline };