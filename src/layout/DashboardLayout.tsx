// libraries
import { motion } from "framer-motion";

// Components
import { Outlet, useLocation } from "react-router-dom";
import { Main } from "./components/main/Main";
import { NavBar } from "./components/navbar/NavBar";
import { NotificationPortal } from "./components/NotificationPortal/NotificationPortal";
import { NotificationItem } from "../components/NotificationItem/NotificationItem";
import { Notification } from "../features/notification/Notification";
import { PageLoader } from "../components/PageLoader/PageLoader";

// Hooks
import { useNotification } from "../context/notificationContext";
import { Suspense, useCallback, useEffect, useState } from "react";

// styles
import styles from "./style.module.css";

/*
 * DashboardLayout — el "esqueleto" de la app: navbar + área de contenido
 * + portal de notificaciones. Todas las páginas se renderizan dentro
 * (vía <Outlet />) mientras navegamos por /dashboard.
 */
const DashboardLayout = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [showNoti, setShowNoti] = useState(false);
  const { current, close } = useNotification();

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      const notificationContainer = document.querySelector('[data-notificationContainer]');
      const target = e.target as HTMLElement;

      const button = target.closest("button");

      if (
        button?.id !== "btn-noti"
      ) {
        setShowNoti(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const location = useLocation();

  const handleNoti = useCallback(() => {
    setShowNoti((current) => !current);
  }, []);

  const handleMenu = useCallback(() => {
    setIsHidden((current) => !current);
  }, []);

  return (
    <>
      <motion.div
        animate={{
          gridTemplateColumns: `${isHidden ? 70 : 250}px 1fr`,
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={styles.dashboardLayout}
      >
        {/* <Header handleMenu={handleMenu} handleNoti={handleNoti} /> */}
        <NavBar
          showNotification={handleNoti}
          showMenu={handleMenu}
          isHidden={isHidden}
        />
        <Main
          key={location.pathname}
          outlet={
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          }
        />

        <Notification
          style={{
            "--margin": isHidden ? "80px" : "260px",
          }}
          show={showNoti}
        />

        <NotificationPortal>
          {current &&
            current.map((noti) => (
              <NotificationItem
                handle={() => close(noti.id)}
                key={noti.id}
                {...noti}
              />
            ))}
        </NotificationPortal>
      </motion.div>
    </>
  );
};

export { DashboardLayout };
