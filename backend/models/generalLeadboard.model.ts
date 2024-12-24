// backend/models/generalLeaderboard.model.ts

import { prisma } from "../config/db.config";  

export const createGeneralLeaderboardEntry = async (
  userId: string,
  totalPoints: number
) => {
  try {
    return await prisma.generalLeaderboard.create({
      data: {
        userId,
        totalPoints,
      },
    });
  } catch (error: any) {
    throw new Error('Error creating general leaderboard entry: ' + error.message);
  }
};


export const getGeneralLeaderboard = async () => {
  try {
    return await prisma.generalLeaderboard.findMany({
      orderBy: { totalPoints: 'desc' },  
      include: {
        user: true,  
      },
    });
  } catch (error: any) {
    throw new Error('Error fetching general leaderboard entries: ' + error.message);
  }
};
