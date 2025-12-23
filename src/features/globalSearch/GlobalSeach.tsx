import { useState } from "react";
import { Search } from "../../components/Search/Search";
import { useSearch } from "../../hooks/useSearch";

// Style
import style from './style.module.css'
import clsx from "clsx";

// Types

type ItemSearchProps = {
    title: string;
    route: string;
    onRoute: () => void;
}

const ItemSearch = ({ title, route, onRoute}: ItemSearchProps ) => {
    return (
        <div className={style.itemSearch} onClick={onRoute}>
            <h4>{title}</h4>
            <p>{route}</p>
        </div>
    );
};

const GlobalSearch = () => {
    const { queryList, router } = useSearch();
    const [keyword, setKeyword] = useState('');
    const [show, setShow] = useState(false);

    const shouldShowList = show && queryList(keyword).length > 0;

    return (
        <div className={style.globalSearch}>
            <Search value={keyword} onBlur={() => setShow(false)} onChange={e => setKeyword(e.target.value)} onFocus={() => setShow(true)} />
            <div className={clsx(style.listSearch,{
                [style.show]: show && shouldShowList
            })}>
                {
                    queryList(keyword).map(({id, title, route}) => (
                        <ItemSearch key={id} route={route} title={title} 
                            onRoute={() => {
                                router(route);
                                setKeyword(title)

                            }} />
                    ))
                }
            </div>
        </div>
    );
}

export { GlobalSearch }