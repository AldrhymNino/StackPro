import { useState } from "react";
import { useStorage } from "../../../hooks/useStorage";
import type { Roadmap } from "../../../types/Roadmap";
import { useNotification } from "../../../context/notificationContext";
import { useNavigate } from "react-router-dom";

type RoadmapInput = Pick<Roadmap, 'title' | 'description' | 'section'> &
    Partial<Pick<Roadmap, 'id' | 'createdAt'>>;

const useRoadMap = (id?: string) => {
    const {state, dispatch} = useStorage<Roadmap>('roadmap');
    // const { add } = useNotification();
    const [keyword, setKeyword] =  useState('');
    // const { addActivity } = useActivityLog();
    const navigate = useNavigate();

    const addRoadMap = (roadmap: RoadmapInput) => {
        const newRoadMap: Roadmap = {
            ...roadmap,
            id: roadmap.id ?? crypto.randomUUID(),
            createdAt: roadmap.createdAt ?? new Date().toISOString(),
        };
    
        dispatch({ type: 'add', payload: newRoadMap });

        // const { notification, activity } = buildEntityFeedback(
        //     'roadmap',
        //     'created',
        //     newRoadMap.title,
        //     newRoadMap.id
        // );

        // add(notification);
        // addActivity(activity);

        navigate('/dashboard/roadmaps');

        return newRoadMap;
    }

    const updateRoadMap = (updatedRoadMap: Roadmap) => {
        dispatch({ type: 'update', payload: updatedRoadMap });

        // const { notification, activity } = buildEntityFeedback(
        //     'roadmap',
        //     'updated',
        //     updatedRoadMap.title,
        //     updatedRoadMap.id
        // );

        // add(notification);
        // addActivity(activity);

        navigate('/dashboard/roadmaps');
    }

    const removeRoadMap =  (removedRoadMap: Roadmap) => {
        dispatch({ type: 'remove', payload: removedRoadMap });

        // const { notification, activity } = buildEntityFeedback(
        //     'roadmap',
        //     'deleted',
        //     removedRoadMap.title,
        //     removedRoadMap.id
        // );

        // add(notification);
        // addActivity(activity);
        
        navigate('/dashboard/roadmaps');
    }

    const getRoadMap = (id: string): Roadmap | null => state.find(roadmap => roadmap.id === id) || null;

    const getRoadMapByFilter = (): Roadmap[] => {
        if (!keyword) return state;
        return state.filter(roadmap => roadmap.title.toLowerCase().includes(keyword.toLowerCase()));
    };

    return {
        roadmaps: state,
        addRoadMap,
        current: id ? getRoadMap(id) : null,
        filteredRoadmaps: getRoadMapByFilter(),
        keyword,
        setKeyword,
        updateRoadMap,
        removeRoadMap,
        getRoadMap,
    };
}

export { useRoadMap };
