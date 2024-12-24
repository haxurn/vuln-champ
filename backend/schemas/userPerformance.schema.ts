// backend/schemas/userPerformance.schema.ts
import { z } from 'zod';

export const userPerformanceSchema = z.object({
  userId: z.string().uuid(),
  points: z.number().int(),
  tasksCompleted: z.number().int(),
  completedAt: z.date(),
});
