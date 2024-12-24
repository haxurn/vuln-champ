// backend/models/notification.model.ts

import { prisma } from "../config/db.config";


export const createNotification = async (
  userId: string,
  type: string,
  content: string
) => {
  return await prisma.notification.create({
    data: {
      userId,
      type,
      content,
    },
  });
};


export const getNotificationsByUserId = async (userId: string) => {
  return await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const markNotificationAsRead = async (notificationId: string) => {
  return await prisma.notification.update({
    where: { id: notificationId },
    data: { read: true },
  });
};


export const getUnreadNotificationsByUserId = async (userId: string) => {
  return await prisma.notification.findMany({
    where: { userId, read: false },
  });
};


export const deleteNotification = async (notificationId: string) => {
  return await prisma.notification.delete({
    where: { id: notificationId },
  });
};
