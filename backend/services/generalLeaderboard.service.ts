// backend/services/generalLeaderboard.service.ts

import { createGeneralLeaderboardEntry, getGeneralLeaderboard } from '../models/generalLeadboard.model';

export const addGeneralLeaderboardEntry = async (userId: string, totalPoints: number) => {
  try {
    const leaderboardEntry = await createGeneralLeaderboardEntry(userId, totalPoints);
    return leaderboardEntry;
  } catch (error: any) {
    throw new Error('Error in adding general leaderboard entry: ' + error.message);
  }
};

export const fetchGeneralLeaderboard = async () => {
  try {
    const leaderboard = await getGeneralLeaderboard();
    return leaderboard;
  } catch (error: any) {
    throw new Error('Error in fetching general leaderboard: ' + error.message);
  }
};
