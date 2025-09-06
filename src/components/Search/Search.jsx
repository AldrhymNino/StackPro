// Components
import { Button } from "../../components";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Styles
import styles from  "./search.module.css";

const Search = () => { 
  return (
    <div className={styles["search"]}>
        <input type="text" placeholder='Search...' />
        <Button icon>
            <FontAwesomeIcon icon={faSearch} />
        </Button>
    </div>
  );
};

export { Search };