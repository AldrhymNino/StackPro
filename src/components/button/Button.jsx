// Styles
import './style.css';


const Button = ({ className, handle, children }) => {
    return (
        <button className={className} onClick={handle}>
            { children }
        </button>
    );
};

export { Button };