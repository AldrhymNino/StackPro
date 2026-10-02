import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Notification } from "../types/Notification";
import { useSound } from "../hooks/useSound";
import {
  NotificationContext,
  type AddNotificationInput,
  type NotificationContextType,
} from "./notificationContext";

type NotificationProviderProps = {
  children: ReactNode;
};

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  // const { state, dispatch } = useStorage<Notification>("notifications");
  const [current, setCurrent] = useState<Notification[]>([]);

  const { play } = useSound("/sounds/notification.mp3", {
    volume: 0.8,
  });

  useEffect(() => {
    if (current.length === 0) return;

    const timer = setTimeout(() => {
      setCurrent((prev) => {
        const [, ...rest] = prev;
        return rest;
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [current]);

  const add = useCallback(
    (input: AddNotificationInput) => {
      const noti: Notification = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        read: false,
        ...input,
      };

      setCurrent((prev) => [...prev, noti]);
      play();
    },
    [play],
  );

  const close = useCallback((id: string) => {
    setCurrent((prev) => prev.filter((noti) => noti.id !== id));
  }, []);


  const value = useMemo<NotificationContextType>(
    () => ({ current, add, close, }),
    [add, close, current,],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider };
