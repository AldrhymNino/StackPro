// Components
import { Button } from "../Buttons/Buttons";

// Icons
import { Search as SearchIcon } from "lucide-react";

// Styles
import styles from  "./style.module.css";
import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

type SearchProp = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Search = ({ className, ...attr }: SearchProp) => { 
  return (
    <div className={clsx(styles["search"], className)}>
        <input {...attr} type="text" placeholder='Search...' />
        <Button notHover variant="icon">
            <SearchIcon />
        </Button>
    </div>
  );
};

export { Search };