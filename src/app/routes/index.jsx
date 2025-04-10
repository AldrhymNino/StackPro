import { Route, Routes } from "react-router-dom";
import { Layout } from "../../layout/Layout.jsx";
import {
    Home, 
    Proyects, 
    Config, 
    Goals, 
    Notes, 
    Bin, 
    NotFound,
    Calendary
} from "../../pages";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/proyects" element={<Proyects/>} />
                <Route path="/notes" element={<Notes/>} />
                <Route path="/bin" element={<Bin/>} />
                <Route path="/goals" element={<Goals/>} />
                <Route path="/calendary" element={<Calendary/>}/>
            </Route>
            <Route path="/config" element={<Config/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    );
};

export { AppRoutes }