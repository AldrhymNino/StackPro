type DescriptionProps = {
    styles: { [key: string]: string };
    state: {
        description: string;
        setDescription: React.Dispatch<React.SetStateAction<string>>;
    };
};

const Description = ({ styles, state }: DescriptionProps) => {

    const { description, setDescription } = state;

    return (
        <div className={styles.field}>
          <label>Descripción</label>
          <textarea
            placeholder="Describe brevemente el propósito del proyecto..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
    );
};

export { Description };