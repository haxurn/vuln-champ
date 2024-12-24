// backend/models/leaderboard.model.ts

import { prisma } from "../config/db.config";

// Create a new leaderboard entry
export const createLeaderboardEntry = async (
  weekStart: Date,
  weekEnd: Date,
  userId: string,
  rank: number,
  totalPoints: number,
  vulnerabilitiesFound: number
) => {
  return await prisma.leaderboard.create({
    data: {
      weekStart,
      weekEnd,
      userId,
      rank,
      totalPoints,
      vulnerabilitiesFound,
    },
  });
};

export const getLeaderboardForWeek = async (weekStart: Date, weekEnd: Date) => {
  return await prisma.leaderboard.findMany({
    where: {
      weekStart: { gte: weekStart },
      weekEnd: { lte: weekEnd },
    },
    orderBy: { rank: 'asc' },
    include: {
      user: true,  // Include user details
    },
  });
};
