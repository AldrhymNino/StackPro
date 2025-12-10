// Icons
import { Bell, Moon, Sun, Menu } from "lucide-react";

// Components
import { Button } from "../../../components/Buttons/Buttons";

// Styles
import styles from './style.module.css'

// Context
import { useTheme } from "../../../context/themeContex";
import { Search } from "../../../components/Search/Search";

type HeaderProps = {
    handleMenu: () => void
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
            <h1>StackPro</h1>
            <div className={styles.btnGroup}>
                <Search className={styles.searchHeader} />
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