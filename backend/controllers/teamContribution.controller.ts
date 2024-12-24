// backend/controllers/teamContribution.controller.ts
import { Request, Response } from 'express';
import teamContributionService from '../services/teamContribution.service';
import { TeamContributionSchema, UpdateTeamContributionSchema } from '../schemas/teamContribution.schema'; // Import Zod schemas
import { successResponse, errorResponse } from '../utils/response.util';

export const createTeamContribution = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = TeamContributionSchema.parse(req.body);

    const newTeamContribution = await teamContributionService.createTeamContribution(validatedData);

    successResponse(res, { teamContribution: newTeamContribution }, 'Team contribution created successfully');
  } catch (error: any) {
    console.error(error);
    errorResponse(res, error.message || 'An error occurred while creating the team contribution');
  }
};

export const getAllTeamContributions = async (req: Request, res: Response): Promise<void> => {
  try {
    const teamContributions = await teamContributionService.getAllTeamContributions();
    successResponse(res, { teamContributions }, 'Team contributions fetched successfully');
  } catch (error: any) {
    console.error(error);
    errorResponse(res, error.message || 'An error occurred while fetching team contributions');
  }
};

export const getTeamContributionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const teamContribution = await teamContributionService.getTeamContributionById(req.params.id);
    if (!teamContribution) {
      errorResponse(res, 'Team contribution not found');
      return;
    }
    successResponse(res, { teamContribution }, 'Team contribution fetched successfully');
  } catch (error: any) {
    console.error(error);
    errorResponse(res, error.message || 'An error occurred while fetching the team contribution');
  }
};

export const updateTeamContribution = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = UpdateTeamContributionSchema.parse(req.body);
    const updatedTeamContribution = await teamContributionService.updateTeamContribution(req.params.id, validatedData);

    if (!updatedTeamContribution) {
      errorResponse(res, 'Team contribution not found');
      return;
    }

    successResponse(res, { teamContribution: updatedTeamContribution }, 'Team contribution updated successfully');
  } catch (error: any) {
    console.error(error);
    errorResponse(res, error.message || 'An error occurred while updating the team contribution');
  }
};

export const deleteTeamContribution = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTeamContribution = await teamContributionService.deleteTeamContribution(req.params.id);

    if (!deletedTeamContribution) {
      errorResponse(res, 'Team contribution not found');
      return;
    }

    successResponse(res, {}, 'Team contribution deleted successfully');
  } catch (error: any) {
    console.error(error);
    errorResponse(res, error.message || 'An error occurred while deleting the team contribution');
  }
};