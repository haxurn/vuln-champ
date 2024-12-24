// backend/controllers/notification.controller.ts
import { Request, Response } from "express";
import * as notificationService from "../models/notification.model";

export const createNotification = async (req: Request, res: Response) => {
  const { userId, type, content, isGlobal } = req.body;
  try {
    const notification = await notificationService.createNotification(userId, type, content);
    if (isGlobal) {
    }
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Error creating notification" });
  }
};

export const getNotifications = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const notifications = await notificationService.getNotificationsByUserId(userId);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching notifications" });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  const notificationId = req.params.notificationId;
  try {
    const notification = await notificationService.markNotificationAsRead(notificationId);
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Error marking notification as read" });
  }
};
