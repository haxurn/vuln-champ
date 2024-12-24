// backend/schemas/leaderboard.schema.ts

import { z } from 'zod';

export const leaderboardSchema = z.object({
  weekStart: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format for weekStart",
  }),
  weekEnd: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format for weekEnd",
  }),
  userId: z.string().uuid(),
  rank: z.number().int(),
  totalPoints: z.number().int(),
  vulnerabilitiesFound: z.number().int(),
});
