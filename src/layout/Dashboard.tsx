// Components
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Main } from './components/main/Main';
import { NavBar } from './components/navbar/NavBar';
import Modal from './components/notiPortal/notiPortal';
import { NotificationItem } from '../components/NotificationItem/NotificationItem';
import { Notification } from '../features/notification/Notification';

// Hooks
import { useNotification } from '../context/notificationsContext';
import { useState, type CSSProperties } from 'react';

// styles
import styles from './style.module.css';

const Dashboard = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [showNoti, setShowNoti] = useState(false);
  const { current, close } = useNotification();

  const location = useLocation();

  const handleMenu = () => {
    setIsHidden(!isHidden);
  };

  const handleNoti = () => {
    setShowNoti(!showNoti)
  }

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
        <Header handleMenu={handleMenu} handleNoti={handleNoti} />
        <NavBar isHidden={isHidden} />
        <Main key={location.pathname} outlet={<Outlet />} />

        <Notification show={showNoti} />

        <Modal>
          {current && current.map((noti) => (
            <NotificationItem handle={() => close(noti.id)} key={noti.id} {...noti} />
          ))}
        </Modal>

      </div>
    </>
  );
};

export { Dashboard };
