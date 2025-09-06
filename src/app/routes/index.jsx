import { Route, Routes } from "react-router-dom";
import { Layout } from "../../layout/Layout.jsx";
import {
    Dashboard, 
    Proyects, 
    Config, 
    Goals, 
    Notes,
    NotFound,
    Calendary,
    Profile,
    Home,
    Createproyect,
    Createnote,
    Openproyects
} from "../../pages";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<Layout/>}>
                <Route path="/dashboard" element={<Dashboard/>} />

                <Route path="/proyects" element={<Proyects/>} />
                <Route path="/proyects/create" element={<Createproyect />} />
                <Route path="/proyects/:proyectName" element={<Openproyects />} />

                <Route path="/notes" element={<Notes/>} />
                <Route path="/notes/create" element={<Createnote />} />

                <Route path="/goals" element={<Goals/>} />
                <Route path="/calendary" element={<Calendary/>} />
                <Route path="/profile" element={<Profile/>} />
            </Route>
            <Route path="/config" element={<Config/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    );
};

export { AppRoutes }