// backend/services/teamContribution.service.ts

import { TeamContribution } from '../models/teamContribution.model';
import { TeamContributionData } from '../schemas/teamContribution.schema'; // Import the interface

export const createTeamContribution = async (data: TeamContributionData) => {
  return await TeamContribution.create({
    data,
  });
};

export const getAllTeamContributions = async () => {
  return await TeamContribution.findMany();
};

export const getTeamContributionById = async (id: string) => {
  return await TeamContribution.findUnique({
    where: { id },
  });
};

export const updateTeamContribution = async (id: string, data: Partial<TeamContributionData>) => {
  return await TeamContribution.update({
    where: { id },
    data,
  });
};

export const deleteTeamContribution = async (id: string) => {
  return await TeamContribution.delete({
    where: { id },
  });
};

export default {
  createTeamContribution,
  getAllTeamContributions,
  getTeamContributionById,
  updateTeamContribution,
  deleteTeamContribution,
};