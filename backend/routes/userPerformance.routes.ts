// backend/routes/userPerformance.routes.ts

import { Router } from 'express';
import * as userPerformanceController from '../controllers/userPerformance.controller';
import { validateRequest } from '../middleware/validatedRequest.middleware';
import { userPerformanceSchema } from '../schemas/userPerformance.schema';
import { checkAdminRole } from '../middleware/role.middleware';
import { validateToken } from '../middleware/auth.middleware'; 

const router = Router();

router.post(
  '/',
  validateRequest(userPerformanceSchema),
  checkAdminRole,
  userPerformanceController.createUserPerformance
);


router.get('/:userId', validateToken, userPerformanceController.getUserPerformance);

export default router;
