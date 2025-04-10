import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import '../style/main.css';

const App = () => {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
};

export default App
