// backend/services/userPerformance.service.ts

import * as userPerformanceModel from '../models/userPerformance.model';


export const createUserPerformance = async (userId: string, points: number, tasksCompleted: number, completedAt: Date) => {
  return await userPerformanceModel.createUserPerformance(userId, points, tasksCompleted, completedAt);
};


export const getUserPerformance = async (userId: string) => {
  return await userPerformanceModel.getUserPerformance(userId);
};