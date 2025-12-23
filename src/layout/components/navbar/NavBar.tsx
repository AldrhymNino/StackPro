import clsx from 'clsx';
import { FolderKanban, Home, Map, Settings, StickyNote, User2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

type NavBarProps = {
  isHidden: boolean;
};

const NavBar = ({ isHidden }: NavBarProps) => {

  const toggleHiddenClass = (className: string) =>
    clsx(styles[className], { [styles.hidden]: isHidden });

  const links = [
    { text: 'Dashboard', to: '/dashboard/home', icon: <Home /> },
    { text: 'Projects', to: '/dashboard/projects', icon: <FolderKanban /> },
    { text: 'Notes', to: '/dashboard/notes', icon: <StickyNote /> },
    { text: 'RoadMap', to: '/dashboard/roadmaps', icon: <Map /> },
    { text: 'Profile', to: '/dashboard/profile', icon: <User2Icon /> },
    { text: 'Settings', to: '/dashboard/settings', icon: <Settings /> }
  ];

  return (
    <nav className={toggleHiddenClass('navbar')}>
      {links.map(({ to, icon, text }) => (
        <Link
          key={to}
          to={to}
          className={clsx(
            styles.link,
            { [styles.hidden]: isHidden },
          )}
        >
          {icon}
          <div className={styles.text}>{text}</div>
        </Link>
      ))}
    </nav>
  );
};

export { NavBar };
