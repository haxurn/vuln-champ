// backend/routes/badge.routes.ts

import express from 'express';
import * as badgeController from '../controllers/badge.controller';
import upload from '../utils/upload.util';
import { validateToken } from '../middleware/auth.middleware';



const router = express.Router();

router.use(validateToken);

router.post('/', upload.single('image'), badgeController.createBadge);
router.get('/:userId', badgeController.getBadgesByUser);
router.get('/', badgeController.getAllBadges);
router.patch('/:id', upload.single('image'), badgeController.updateBadge);
router.delete('/:id', badgeController.deleteBadge);

export default router;
