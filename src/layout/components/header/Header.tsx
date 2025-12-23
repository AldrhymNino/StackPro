// Icons
import { Bell, Moon, Sun, Menu } from "lucide-react";

// Components
import { Button } from "../../../components/Buttons/Buttons";

// Styles
import styles from './style.module.css'

// Context
import { useTheme } from "../../../context/themeContex";
import { GlobalSearch } from "../../../features/globalSearch/GlobalSeach";

type HeaderProps = {
    handleMenu: () => void;
}

const Header = ({ handleMenu }: HeaderProps) => {
    const {theme, toggleTheme} = useTheme();

    const handleTheme = () => {
        toggleTheme();
    };

    return (
        <header className={styles.header}>
            <Button variant="icon" onClick={handleMenu}>
                <Menu />
            </Button>
            <h1>Stack Pro</h1>
            <div className={styles.btnGroup}>
                <GlobalSearch />
                <Button variant="icon" className='btn' onClick={handleTheme}>
                    {theme === 'dark' ? <Sun/> : <Moon /> }
                </Button>
                <Button variant="icon" className="btn bell">
                    <Bell />
                </Button>
            </div>
        </header>
    )
};

export { Header }