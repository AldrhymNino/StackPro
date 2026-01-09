import { useState } from "react";
import { useStorage } from "../../../hooks/useStorage";
import type { Roadmap } from "../../../types/Roadmap";
import { useNotification } from "../../../context/notificationsContext";
import { useNavigate } from "react-router-dom";

const useRoadMap = (id?: string) => {
    const {state, dispatch} = useStorage<Roadmap>('roadmap');
    const { add } = useNotification();
    const [keyword, setKeyword] =  useState('');
    const navigate = useNavigate()

    const addRoadMap = (roadmap: Pick<Roadmap, 'title' | 'description' | 'section'>) => {
        const newRoadMap: Roadmap = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            ...roadmap,
        };
    
        dispatch({ type: 'add', payload: newRoadMap });
        add({
            title: 'Roadmap creado',
            message: 'El roadmap "' + roadmap.title + '" ha sido creado exitosamente.',
            type: 'success',
            entity: {
                type: 'roadmap',
                id: newRoadMap.id
            }
        });

        navigate('/dashboard/roadmaps');
    }

    const updateRoadMap = (updatedRoadMap: Roadmap) => {
        dispatch({ type: 'update', payload: updatedRoadMap });
        add({
            title: 'Roadmap Actualizado',
            message: 'El roadmap "' + updatedRoadMap.title + '" ha sido actualizado exitosamente.',
            type: 'info',
            entity: {
                type: 'roadmap',
                id: updatedRoadMap.id
            }
        });

        navigate('/dashboard/roadmaps');
    }

    const removeRoadMap =  (removedRoadMap: Roadmap) => {
        dispatch({ type: 'remove', payload: removedRoadMap });
        add({
            title: 'Roadmap Eliminado',
            message: 'El roadmap "' + removedRoadMap.title + '" ha sido eliminado exitosamente.',
            type: 'error',
            entity: {
                type: 'roadmap',
                id: removedRoadMap.id
            }
        });

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