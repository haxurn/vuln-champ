// backend/schemas/generalLeaderboard.schema.ts

import { z } from 'zod';

export const generalLeaderboardSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  totalPoints: z.number().int().positive('Total points must be a positive integer'),
});
