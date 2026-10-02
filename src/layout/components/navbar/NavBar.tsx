// Libraries
import {
  Bell,
  FolderKanban,
  Home,
  Map,
  MenuIcon,
  Settings,
  StickyNote,
  User2Icon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

// Components
import { Button } from "../../../components/Buttons/Buttons";

// Context
import { useTheme } from "../../../context/themeContext";

// Styles
import styles from "./style.module.css";
import clsx from "clsx";
import { ThemeButton } from "../ThemeButton/ThemeButton";
import { useProject } from "../../../features/projects/hooks/useProject";

// Constants
const NAV_LINKS = [
  { text: "Dashboard", to: "/dashboard/home", icon: <Home /> },
  { text: "Projects", to: "/dashboard/projects", icon: <FolderKanban /> },
  { text: "Notes", to: "/dashboard/notes", icon: <StickyNote /> },
  { text: "RoadMap", to: "/dashboard/roadmaps", icon: <Map /> },
  { text: "Profile", to: "/dashboard/profile", icon: <User2Icon /> },
  { text: "Settings", to: "/dashboard/settings", icon: <Settings /> },
] as const;

type NavBarProps = {
  showNotification: () => void;
  showMenu: () => void;
  isHidden: boolean;
};

const NavBar = ({ showNotification, showMenu, isHidden }: NavBarProps) => {
  const { toggleTheme } = useTheme();
  const { createProject } = useProject();

  // *🚀 Atajos de teclado para accesibilidad*
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 🚫 Evita conflictos mientras se escribe
      const target = e.target as HTMLElement;
      const tag = target.tagName;

      if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      // Alt + N → Nueva notificación
      if (e.altKey && e.key.toLowerCase() === "n") {
        showNotification();
        return;
      }

      // Alt + M → Abrir menú
      if (e.altKey && e.key.toLowerCase() === "m") {
        showMenu();
        return;
      }

      // Alt + Shift + T → Cambiar tema
      if (e.altKey && e.shiftKey && e.key === "T") {
        toggleTheme();
        return;
      }

      // Alt  + P -> crear Project
      if(e.shiftKey && e.key === 'P') {
        createProject();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showNotification, showMenu, toggleTheme]);

  return (
    <nav
      className={clsx(styles.navbar, {
        [styles.hidden]: isHidden,
      })}
    >
      <Button
        style={{ "--size": "40px" }}
        variant="icon"
        color="info"
        className={styles.menu}
        onClick={showMenu}
      >
        <MenuIcon />
      </Button>

      <div className={styles.links}>
        {NAV_LINKS.map(({ to, icon, text }) => (
          <Link key={to} to={to} className={styles.link}>
            <span className={styles.icon}>{icon}</span>

            <span className={styles.text}>{text}</span>
          </Link>
        ))}
      </div>

      <div className={styles.navContainerBottom}>
        <ThemeButton isHidden={isHidden} />

        <Button
          id="btn-noti"
          variant="icon"
          color="info"
          className="btn bell"
          onClick={showNotification}
        >
          <Bell />
        </Button>
      </div>
    </nav>
  );
};

export { NavBar };
