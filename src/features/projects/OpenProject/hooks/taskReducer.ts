import type { Project, Task } from "../../../../types/Project";

// Types
export type TaskAction =
  | {
      type: "create-task";
    }
  | {
      type: "set-priority";
      value: Project["priority"];
    }
  | {
      type: "set-title";
      value: string;
    }
  | {
      type: "status-change";
    } 
  | {
      type: 'remove-current-task'
    };

const taskReducer = (state: Task | null, action: TaskAction): Task | null => {

  switch (action.type) {
    case "create-task": {
      const id = crypto.randomUUID();
      const createdAt = new Date().toISOString();
      return {
        id,
        title: '',
        createdAt,
        priority: "normal",
        done: false,
      };
    }

    case 'set-title': {
      if (!state) return state;
      const { value } = action;
      return {
        ...state,
        title: value
      }
    }

    case 'set-priority': {
      if (!state) return state;
      const { value: priority } = action;

      return {
        ...state,
        priority
      }
    }

    case "status-change": {
      if (!state) return state;
      return {
        ...state,
        done: !state.done
      }
    }

    case 'remove-current-task':
      return null; 

    default:
      return state;
  }
};

export { taskReducer };
