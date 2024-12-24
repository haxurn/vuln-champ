// backend/models/userPerformance.model.ts
import { prisma } from "../config/db.config"; // Adjust the path as needed


export const createUserPerformance = async (userId: string, points: number, tasksCompleted: number, completedAt: Date) => {
  return await prisma.userPerformance.create({
    data: {
      userId,
      points,
      tasksCompleted,
      completedAt,
    },
  });
};

export const getUserPerformance = async (userId: string) => {
  return await prisma.userPerformance.findMany({
    where: {
      userId,
    },
    orderBy: {
      completedAt: 'desc',
    },
  });
};