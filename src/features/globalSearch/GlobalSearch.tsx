import { useState } from "react";
import clsx from "clsx";
import { Search } from "../../components/Search/Search";
import { useSearch } from "../../hooks/useSearch";

// Style
import styles from "./style.module.css";

type ItemSearchProps = {
  title: string;
  route: string;
  onRoute: () => void;
};

const ItemSearch = ({ title, route, onRoute }: ItemSearchProps) => {
  return (
    <button className={styles.itemSearch} onMouseDown={onRoute} type="button">
      <h4>{title}</h4>
      <p>{route}</p>
    </button>
  );
};

const GlobalSearch = () => {
  const { queryList, router } = useSearch();
  const [keyword, setKeyword] = useState("");
  const [show, setShow] = useState(false);

  const results = queryList(keyword);
  const shouldShowList = show && results.length > 0;

  return (
    <div className={styles.globalSearch}>
      <Search
        className={styles.searchInput}
        onBlur={() => setShow(false)}
        onChange={(event) => setKeyword(event.target.value)}
        onFocus={() => setShow(true)}
        value={keyword}
      />

      <div
        className={clsx(styles.listSearch, {
          [styles.show]: shouldShowList,
        })}
      >
        {results.map(({ id, title, route }) => (
          <ItemSearch
            key={id}
            route={route}
            title={title}
            onRoute={() => {
              router(route);
              setKeyword(title);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export { GlobalSearch };
