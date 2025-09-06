// Icons FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHouse,  
    faFolderOpen, 
    faNoteSticky, 
    faBullseye,
    faGear,
    faCalendarDays,
    faUser,
    faBell,
    faMoon,
    faPlus
} from '@fortawesome/free-solid-svg-icons';

// Components
import { Button } from '../components';


// routers
import { Link, Outlet } from "react-router-dom";

// Style
import "./layout.css";

const Layout = () => {
    
    return (
        <div className="container">
            <header className='header'>
                <div className="logo">
                    <h1>StackPro</h1>
                </div>
                <div className='header-buttons'>
                    <Button icon>
                        <FontAwesomeIcon icon={faMoon} />
                    </Button>
                    <Button icon>
                        <FontAwesomeIcon icon={faBell} />
                    </Button>
                </div>
            </header>
            <nav className="nav">
                <div className="group_links">
                    <Link to="/dashboard"><FontAwesomeIcon className='icons' icon={faHouse} /><div>Dashboard</div></Link>
                    <Link to="/proyects"><FontAwesomeIcon className='icons' icon={faFolderOpen} /><div>Proyects</div></Link>
                    <Link to="/notes"><FontAwesomeIcon className='icons' icon={faNoteSticky} /><div>Notes</div></Link>
                    <Link to="/goals"><FontAwesomeIcon className='icons' icon={faBullseye} /><div>Goals</div></Link>
                    <Link to="/calendary"><FontAwesomeIcon className='icons' icon={faCalendarDays} /><div>Calendary</div></Link>
                </div>
                <div className="group_links">
                    <Link to="/profile"><FontAwesomeIcon className='icons' icon={faUser} /><div>Aldrhym Niño</div></Link>
                    <Link to="/config"><FontAwesomeIcon className='icons' icon={faGear} /><div>Configuration</div></Link>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export { Layout }