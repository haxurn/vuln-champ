// backend/routes/generalLeaderboard.routes.ts

import { Router } from 'express';
import * as generalLeaderboardController from '../controllers/generalLeaderboard.controller';
import { validateRequest } from '../middleware/validatedRequest.middleware';
import { generalLeaderboardSchema } from '../schemas/generalLoardboard.schema';
import { validateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(validateToken);

router.post(
  '/',
  validateRequest(generalLeaderboardSchema),  
  generalLeaderboardController.createGeneralLeaderboard
);

router.get('/', generalLeaderboardController.getGeneralLeaderboardEntries);

export default router;
