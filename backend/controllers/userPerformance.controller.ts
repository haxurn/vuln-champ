// backend/controllers/userPerformance.controller.ts
import { Request, Response } from 'express';
import * as userPerformanceService from '../services/userPerformance.service';

export const createUserPerformance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, points, tasksCompleted, completedAt } = req.body;
    const performance = await userPerformanceService.createUserPerformance(userId, points, tasksCompleted, completedAt);
    res.status(201).json(performance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user performance record' });
  }
};

export const getUserPerformance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const performance = await userPerformanceService.getUserPerformance(userId);
    res.status(200).json(performance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user performance records' });
  }
};
