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
    faUser
} from '@fortawesome/free-solid-svg-icons'


// routers
import { Link, Outlet } from "react-router-dom";

// Style
import "./layout.css";

const Layout = () => {
    return (
        <div className="container">
            <header className="header">
                <div className="header_container">
                    <h1>StackPro</h1>
                </div>
                <nav className="nav">
                    <div className="group_links">
                        <Link to="/DashboardHome"><FontAwesomeIcon className='icons' icon={faHouse} /><div>Dashboard</div></Link>
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
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export { Layout }