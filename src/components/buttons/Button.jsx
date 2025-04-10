const Button = ({ className, handle, children }) => {
    return (
        <button className={`btn ${className}`} onClick={handle}>
            { children }
        </button>
    );
};

export { Button };