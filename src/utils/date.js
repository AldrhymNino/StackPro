const date = () => {
    const date= new Date();
    const month = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
}
export { date };