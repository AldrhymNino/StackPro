import { useState, type CSSProperties } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Main } from './components/main/Main';
import { NavBar } from './components/navbar/NavBar';

// styles
import styles from './style.module.css';

const Dashboard = () => {
  const [isHidden, setIsHidden] = useState(true);
  const location = useLocation();

  const handleMenu = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <div
        style={
          {
            '--columnToggleWidth': isHidden ? '70px' : '250px'
          } as CSSProperties
        }
        className={styles.dashboardLayout}
      >
        <Header handleMenu={handleMenu} />
        <NavBar isHidden={isHidden} />
        <Main key={location.pathname} outlet={<Outlet />} />
      </div>
    </>
  );
};

export { Dashboard };
