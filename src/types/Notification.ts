type Notification = {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'warning' | 'info' | 'error';
    createdAt: string;
    read: boolean;
    entity: {
        type: 'project' | 'task' | 'note' | 'roadmap';
        id: string;
    };
};

export type { Notification }