import { createContext, useContext, useEffect, useState } from 'react';
import type { Notification } from '../types/Notification';
import { useStorage } from '../hooks/useStorage';
import { useSound } from '../hooks/useSound';

type NotificationContextType = {
  current: Notification[];
  add: (input: AddNotificationInput) => void;
  saved: Notification[];
  close: (id: string) => void;
  remove: (noti: Notification) => void;
};

type AddNotificationInput = {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
  entity?: {
    type: string;
    id: string;
  };
};


const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { state, dispatch } = useStorage<Notification>('notifications');
  const [current, setCurrent] = useState<Notification[]>([]);

  const { play } = useSound('/sounds/notification.mp3', {
    volume: 0.6,
  });


  useEffect(() => {
    if (current.length === 0) return;

    const timer = setTimeout(() => {
      setCurrent(prev => {
        const [, ...rest] = prev; // elimina el primero
        return rest;
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [current]);

  const add = (input: AddNotificationInput) => {
    const noti: Notification = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      read: false,
      ...input
    } as Notification;

    setCurrent(prev => [...prev, noti]);
    dispatch({ type: 'add', payload: noti });
    play();
  };

  const close = (id: string) => setCurrent(prev => prev.filter(n => n.id !== id));


  const remove = (noti: Notification) => dispatch({type: 'remove', payload: noti}); 

  return (
    <NotificationContext.Provider value={{ current, add,  close, remove, saved: state }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used inside NotificationProvider');
  return ctx;
};
