// backend/services/leaderboard.service.ts

import * as leaderboardModel from '../models/leaderboard.model';

export const createLeaderboardEntry = async (
  weekStart: Date,
  weekEnd: Date,
  userId: string,
  rank: number,
  totalPoints: number,
  vulnerabilitiesFound: number
) => {
  return leaderboardModel.createLeaderboardEntry(
    weekStart,
    weekEnd,
    userId,
    rank,
    totalPoints,
    vulnerabilitiesFound
  );
};

export const getLeaderboardForWeek = async (weekStart: Date, weekEnd: Date) => {
  return leaderboardModel.getLeaderboardForWeek(weekStart, weekEnd);
};
