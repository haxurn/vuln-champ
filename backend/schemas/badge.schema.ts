// backend/schemas/badge.schema.ts
import { z } from "zod";

export const badgeSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  pointsRequired: z.number(),
  userId: z.string(),
});

export type BadgeData = z.infer<typeof badgeSchema>;
