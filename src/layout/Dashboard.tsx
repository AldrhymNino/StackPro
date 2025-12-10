import { useState, type CSSProperties } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Main } from './components/main/Main';
import { NavBar } from './components/navbar/NavBar';

// styles
import styles from './style.module.css';

const Dashboard = () => {
  const [isHidden, setIsHidden] = useState(true);

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
        <Main outlet={<Outlet />} />
      </div>
    </>
  );
};

export { Dashboard };
