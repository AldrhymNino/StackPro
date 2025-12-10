type TitleProps = {
    styles: { [key: string]: string }
    state: {
        title: string,
        setTitle: React.Dispatch<React.SetStateAction<string>>
    };
};

const Title = ({ styles, state}: TitleProps) => {
    const {title, setTitle } = state;
    return (
        <div className={ styles.field }>
          <label>Título</label>
          <input
            type="text"
            placeholder="Ej. Gestor de tareas"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
    );
};

export { Title };