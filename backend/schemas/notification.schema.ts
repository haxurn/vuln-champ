// backend/schemas/notification.schema.ts

import { z } from "zod";

export const createNotificationSchema = z.object({
  userId: z.string().uuid(),
  type: z.enum(["alert", "message", "task"]),
  content: z.string().min(1, "Content must not be empty"),
  isGlobal: z.boolean().default(false),
});
