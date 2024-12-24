// backend/routes/leaderboard.routes.ts

import { Router } from 'express';
import * as leaderboardController from '../controllers/leaderboard.controller';
import { validateRequest } from '../middleware/validatedRequest.middleware';
import { leaderboardSchema } from '../schemas/leaderboard.schema';
import { checkAdminRole } from '../middleware/role.middleware';
import { validateToken } from '../middleware/auth.middleware';


const router = Router();


router.post(
    '/',
    validateToken,
  validateRequest(leaderboardSchema),  
    leaderboardController.createLeaderboard,
  checkAdminRole
);

router.get('/', validateToken, leaderboardController.getLeaderboard);

export default router;
