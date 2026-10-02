// notification.ts
import type { Notification } from "../types/Notification";

type NotificationEntity = Notification["entity"]["type"];

const createNotification = (
  type: Notification["type"],
  entity: NotificationEntity,
  entityId: string,
  title: string,
  message: string
): Omit<Notification, "id" | "createdAt" | "read"> => {
  return {
    title,
    message,
    type,
    entity: {
      type: entity,
      id: entityId,
    },
  };
};

export { createNotification };