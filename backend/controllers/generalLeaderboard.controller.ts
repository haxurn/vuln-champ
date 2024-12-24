// backend/controllers/generalLeaderboard.controller.ts

import { Request, Response } from 'express';
import { addGeneralLeaderboardEntry, fetchGeneralLeaderboard } from '../services/generalLeaderboard.service';

// Create general leaderboard entry
export const createGeneralLeaderboard = async (req: Request, res: Response) => {
  const { userId, totalPoints } = req.body;

  try {
    const leaderboardEntry = await addGeneralLeaderboardEntry(userId, totalPoints);
    res.status(201).json(leaderboardEntry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create general leaderboard entry' });
  }
};

export const getGeneralLeaderboardEntries = async (req: Request, res: Response) => {
  try {
    const leaderboard = await fetchGeneralLeaderboard();
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch general leaderboard entries' });
  }
};
