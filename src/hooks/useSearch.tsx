import { useNavigate } from "react-router-dom";
import type { Note } from "../types/Notes";
import type { Project } from "../types/Project";
import type { Roadmap } from "../types/Roadmap";
import { useStorage } from "./useStorage";

const useSearch = () => {

    const { state: projects } = useStorage<Project>('projects');
    const { state: notes } = useStorage<Note>('notes');
    const { state: roadmap } = useStorage<Roadmap>('roadmap');
    

    const navigate = useNavigate()

    const router = (route: string) => {
        navigate(route)
    }

    const searchIndex = [
        // Proyectos
        ...projects.map(p => ({
            id: p.id,
            type: 'project',
            title: p.title,
            keywords: [p.title, p.description],
            route: `/dashboard/projects/${p.id}`
        })),

        // Notas
        ...notes.map(n => ({
            id: n.id,
            type: 'note',
            title: n.title,
            keywords: [n.title, n.content],
            route: `/dashboard/notes/${n.id}`
        })),

        // Tareas
        ...roadmap.map(t => ({
            id: t.id,
            type: 'roadmap',
            title: t.title,
            keywords: [t.title],
            route: `/dashboard/roadmaps/${t.id}`
        }))
    ];

    const search = (query: string) => {
        if (!query) return []

        const q = query.toLowerCase()

        return searchIndex.filter(item =>
            item.title.toLowerCase().includes(q) ||
            item.keywords.some(k => k.toLowerCase().includes(q))
        )
    }


    return {
        queryList: search,
        router
    }
};

export { useSearch };