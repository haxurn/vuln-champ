// backend/routes/notification.routes.ts
import { Router } from "express";
import * as notificationController from "../controllers/notification.controller";
import { validateToken } from "../middleware/auth.middleware";

const router = Router();


router.post("/", validateToken, notificationController.createNotification);

router.get("/:userId", validateToken, notificationController.getNotifications);

router.patch("/:notificationId/mark-as-read", validateToken, notificationController.markAsRead);

export default router;
