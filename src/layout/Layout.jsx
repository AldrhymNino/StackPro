// Icons FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHouse, 
    faTrash, 
    faFolderOpen, 
    faNoteSticky, 
    faBullseye,
    faGear,
    faCalendarDays,
    faUser,
    faBell,
    faMoon,
    faSearch,
    faPlus
} from '@fortawesome/free-solid-svg-icons';

// Components
import { Button } from '../components';


// routers
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

// Style
import "./layout.css";

const Layout = () => {

    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className="container">
            <header className='header'>
                <div className="logo">
                    <h1>StackPro</h1>
                </div>
                <div className="search">
                    <input type="text" placeholder='Search...' />
                    <Button icon>
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
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
                    <Link to="/bin"><FontAwesomeIcon className='icons' icon={faTrash} /><div>Bin</div></Link>
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
            {
                location.pathname !== "/dashboard" &&
                <Button floated icon handle={() => navigate('proyects/create')}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            }
        </div>
    );
};

export { Layout }