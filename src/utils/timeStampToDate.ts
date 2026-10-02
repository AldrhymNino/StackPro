
// 
const isSameDay = (date: Date, baseDate: Date) => {
  return date.toDateString() === baseDate.toDateString();
};

// Converts a timestamp to a human-readable date string
const timestampToDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const time = date.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isSameDay(date, today)) {
    return `Hoy, ${time}`;
  }

  if (isSameDay(date, yesterday)) {
    return `Ayer, ${time}`;
  }

  return date.toLocaleDateString("es-CO");
};


export { timestampToDate }