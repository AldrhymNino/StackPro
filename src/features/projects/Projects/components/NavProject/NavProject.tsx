// Icons and Styles
import clsx from 'clsx';
import { CheckCircle2, Clock12, ListFilter, Loader2, XCircle } from 'lucide-react';
import styles from './style.module.css';

// Components
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../../components/Buttons/Buttons';
import { Search } from '../../../../../components/Search/Search';

// Types
import { type Dispatch, type SetStateAction } from 'react';
import type { ProjectStatus } from '../../../../../types/Project';

type Filter = 'all' | ProjectStatus | string;

type NavProjectProps = {
  state: {
    filter: Filter;
    setFilter: Dispatch<SetStateAction<Filter>>;
  };

  stateInput: {
    keyword: string;
    setKeyword: Dispatch<SetStateAction<string>>;
  };
};

const NavProject = ({ state, stateInput }: NavProjectProps) => {
  const { filter, setFilter } = state;
  const { keyword, setKeyword } = stateInput;
  const navigate = useNavigate();

  const buttons = [
    { id: 'all', label: 'All', icon: <ListFilter size={18} /> },
    { id: 'done', label: 'Done', icon: <CheckCircle2 size={18} /> },
    { id: 'progress', label: 'In Progress', icon: <Loader2 size={18} /> },
    { id: 'pending', label: 'Pending', icon: <Clock12 size={18} /> },
    { id: 'canceled', label: 'Cancelled', icon: <XCircle size={18} /> }
  ] as const;
  return (
    <div className={styles.menu}>
      {buttons.map((btn) => (
        <Button
          ghost
          variant="primary-icon"
          key={btn.id}
          className={clsx(styles.btn, filter === btn.id && styles.active)}
          onClick={() => setFilter(btn.id)}
        >
          {btn.icon}
          <span>{btn.label}</span>
        </Button>
      ))}
      <div className={styles.last}>
        <Search value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <Button variant="primary" onClick={() => navigate('/dashboard/projects/create')}>
          New Project
        </Button>
      </div>
    </div>
  );
};

export { NavProject };
