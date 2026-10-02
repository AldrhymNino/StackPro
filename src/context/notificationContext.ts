/*
 * notificationContext — acceso global al sistema de notificaciones.
 *
 * NotificationProvider lo llena con add()/close() y cualquier parte de
 * la app puede disparar una notificación con useNotification().add(...).
 * (El mensaje + actividad se construyen con utils/entityFeedback.ts)
 */
import { createContext, useContext } from "react";
import type { Notification } from "../types/Notification";

type AddNotificationInput = {
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  entity: Notification["entity"];
};

type NotificationContextType = {
  current: Notification[];
  add: (input: AddNotificationInput) => void;
  close: (id: string) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used inside NotificationProvider");
  }

  return context;
};

export { NotificationContext, useNotification };
export type { AddNotificationInput, NotificationContextType };
