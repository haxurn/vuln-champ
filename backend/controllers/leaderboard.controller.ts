// backend/controllers/leaderboard.controller.ts

import { Request, Response } from 'express';
import * as leaderboardService from '../services/leaderboard.service';

export const createLeaderboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { weekStart, weekEnd, userId, rank, totalPoints, vulnerabilitiesFound } = req.body;
    const leaderboard = await leaderboardService.createLeaderboardEntry(
      new Date(weekStart),
      new Date(weekEnd),
      userId,
      rank,
      totalPoints,
      vulnerabilitiesFound
    );
    res.status(201).json(leaderboard);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create leaderboard entry' });
  }
};

export const getLeaderboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { weekStart, weekEnd } = req.query;
    if (!weekStart || !weekEnd) {
      res.status(400).json({ error: 'Please provide both weekStart and weekEnd dates' });
      return;
    }
    const leaderboard = await leaderboardService.getLeaderboardForWeek(
      new Date(weekStart as string),
      new Date(weekEnd as string)
    );
    res.status(200).json(leaderboard);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};
