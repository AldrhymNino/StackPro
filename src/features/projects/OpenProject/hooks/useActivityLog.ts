// Hooks
import { useCallback, useEffect, useMemo } from "react";

// types
import type { DashboardActivity } from "../../../dashboard/types";
import type { ProjectAction } from "./projectReducer";


const MAX_ACTIVITY_ITEMS = 10;

const sortByNewest = (activities: DashboardActivity[]) => {
    return [...activities].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
};

const useActivityLog = (state: DashboardActivity[], dispatch: (action: ProjectAction) => void) => {

    const activityLog = useMemo(
        () => sortByNewest(state).slice(0, MAX_ACTIVITY_ITEMS),
        [state],
    );

    useEffect(() => {
        if(state.length <= MAX_ACTIVITY_ITEMS) {
            return;
        }

        sortByNewest(state)
            .slice(MAX_ACTIVITY_ITEMS)
            .forEach((activity) => {
                // dispatch({ type: '', payload: activity });
            });
    }, [dispatch, state]);

    const addActivity = useCallback((activity: Omit<DashboardActivity, 'id' | 'timestamp'>) => {
        const newActivity: DashboardActivity = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            ...activity
        };

        // dispatch({ type: 'set-activityLog', payload: newActivity });
    }, [dispatch]);

    return {
        activityLog,
        addActivity,
    };
};

export { useActivityLog };
