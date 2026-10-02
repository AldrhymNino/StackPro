import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// * Components
import { Button } from "../Buttons/Buttons";

// * Styles
import styles from "./style.module.css";

type DatePickerProps = {
  deadline?: string | null;
  onChange?: (date: string | null) => void;
};

// * Utils
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const parseDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
};

const DatePicker = ({
  deadline,
  onChange,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);

  /*
   * Fecha actual normalizada al inicio del día.
   */
  const todayRef = useRef((() => {
    const date = new Date();

    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
  })()).current;

  /*
   * Mes mínimo permitido.
   */
  const minMonthRef = useRef(
    new Date(
      todayRef.getFullYear(),
      todayRef.getMonth(),
      1,
    ),
  );

  /*
   * Mes que estamos visualizando.
   */
  const [currentDate, setCurrentDate] = useState(() => {
    const date = deadline
      ? parseDate(deadline)
      : todayRef;

    return new Date(
      date.getFullYear(),
      date.getMonth(),
      1,
    );
  });

  /*
   * Cerrar al hacer click afuera.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  /*
   * Datos del calendario.
   */
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(
    year,
    month,
    1,
  ).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0,
  ).getDate();

  /*
   * Cambiar mes.
   */
  const previousMonth = () => {
    if (
      currentDate.getTime() >
      minMonthRef.current.getTime()
    ) {
      setCurrentDate(
        new Date(year, month - 1, 1),
      );
    }
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1),
    );
  };

  /*
   * Seleccionar día.
   */
  const selectDay = (day: number) => {
    const date = new Date(year, month, day);

    if (
      date.getTime() <
      todayRef.getTime()
    ) {
      return;
    }

    onChange?.(formatDate(date));
    setIsOpen(false);
  };

  /*
   * Seleccionar hoy.
   */
  const selectToday = () => {
    onChange?.(formatDate(todayRef));

    setCurrentDate(
      new Date(
        todayRef.getFullYear(),
        todayRef.getMonth(),
        1,
      ),
    );

    setIsOpen(false);
  };

  /*
   * Limpiar fecha.
   */
  const clearDate = () => {
    onChange?.(null);
    setIsOpen(false);
  };

  /*
   * Crear días.
   */
  const days = Array.from(
    {
      length: firstDay + daysInMonth,
    },
    (_, index) => {
      if (index < firstDay) {
        return null;
      }

      return index - firstDay + 1;
    },
  );

  /*
   * Fecha de hoy.
   */
  const today = formatDate(todayRef);

  /*
   * Fecha seleccionada.
   */
  const selectedDate = deadline
    ? parseDate(deadline)
    : null;

  return (
    <div
      ref={pickerRef}
      className={styles.datePicker}
    >
      <Button
        variant="outline"
        color="info"
        className={styles.deadlineProject}
        onClick={() =>
          setIsOpen((prev) => !prev)
        }
      >
        <CalendarDays size={16} />

        {deadline
          ? `Límite: ${parseDate(
              deadline,
            ).toLocaleDateString("es-ES")}`
          : "Límite: No Definido"}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.calendar}
            initial={{
              opacity: 0,
              y: -6,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -6,
              scale: 0.97,
            }}
            transition={{
              duration: 0.14,
              ease: "easeOut",
            }}
          >
            {/* Header */}
            <div
              className={styles.calendarHeader}
            >
              <Button
                variant="icon"
                type="button"
                disabled={
                  currentDate.getTime() <=
                  minMonthRef.current.getTime()
                }
                onClick={previousMonth}
              >
                <ChevronLeft size={17} />
              </Button>

              <span>
                {currentDate.toLocaleDateString(
                  "es-ES",
                  {
                    month: "long",
                    year: "numeric",
                  },
                )}
              </span>

              <Button
                variant="icon"
                type="button"
                onClick={nextMonth}
              >
                <ChevronRight size={17} />
              </Button>
            </div>

            {/* Week days */}
            <div className={styles.weekDays}>
              {[
                "D",
                "L",
                "M",
                "X",
                "J",
                "V",
                "S",
              ].map((day) => (
                <span key={day}>
                  {day}
                </span>
              ))}
            </div>

            {/* Days */}
            <div className={styles.days}>
              {days.map((day, index) => {
                if (day === null) {
                  return (
                    <span
                      key={`empty-${index}`}
                    />
                  );
                }

                const date = new Date(
                  year,
                  month,
                  day,
                );

                const isPast =
                  date.getTime() <
                  todayRef.getTime();

                const isSelected =
                  selectedDate?.getTime() ===
                  date.getTime();

                const isToday =
                  formatDate(date) === today;

                return (
                  <Button
                    key={day}
                    type="button"
                    disabled={isPast}
                    className={
                      isSelected
                        ? styles.selectedDay
                        : isToday
                          ? styles.today
                          : styles.day
                    }
                    onClick={() =>
                      selectDay(day)
                    }
                  >
                    {day}
                  </Button>
                );
              })}
            </div>

            {/* Footer */}
            <div
              className={styles.calendarFooter}
            >
              <Button
                variant="ghost"
                color="error"
                type="button"
                onClick={clearDate}
              >
                Limpiar
              </Button>

              <Button
                variant="ghost"
                color="info"
                type="button"
                onClick={selectToday}
              >
                Hoy
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { DatePicker };