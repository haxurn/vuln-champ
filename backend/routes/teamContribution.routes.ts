// backend/routes/teamContribution.routes.ts

import express from 'express';
import {
  createTeamContribution,
  getAllTeamContributions,
  getTeamContributionById,
  updateTeamContribution,
  deleteTeamContribution,
} from '../controllers/teamContribution.controller';

const router = express.Router();

router.post('/', createTeamContribution);
router.get('/', getAllTeamContributions);
router.get('/:id', getTeamContributionById);
router.patch('/:id', updateTeamContribution);
router.delete('/:id', deleteTeamContribution);

export default router;