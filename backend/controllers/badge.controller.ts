// backend/controllers/badge.controller.ts

import { Request, Response } from 'express';
import * as badgeService from '../services/badge.service';
import { badgeSchema } from '../schemas/badge.schema';

export const createBadge = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, pointsRequired, userId } = req.body;
    const image = req.file?.path; 

    const badgeData = badgeSchema.parse({ name, description, image, pointsRequired, userId });

    const newBadge = await badgeService.createBadge(badgeData);

    res.status(201).json({
      message: 'Badge created successfully',
      data: newBadge,
    });
    return;
  } catch (error: any) {
    console.error('Error in createBadge:', error);
    if (error.name === 'ZodError') {
      res.status(400).json({ message: 'Validation error', details: error.errors });
      return;
    }
      res.status(500).json({ message: 'Internal server error' });
      return;
  }
};

export const getBadgesByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const badges = await badgeService.getBadgesByUser(userId);

    res.status(200).json({
      message: 'Badges fetched successfully',
      data: badges,
    });
    return;
  } catch (error) {
    console.error('Error in getBadgesByUser:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};

export const getAllBadges = async (_req: Request, res: Response): Promise<void> => {
  try {
    const badges = await badgeService.getAllBadges();

    res.status(200).json({
      message: 'All badges fetched successfully',
      data: badges,
    });
    return;
  } catch (error) {
    console.error('Error in getAllBadges:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};

export const updateBadge = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const badgeData = badgeSchema.parse(req.body);

    const updatedBadge = await badgeService.updateBadge(id, badgeData);

    res.status(200).json({
      message: 'Badge updated successfully',
      data: updatedBadge,
    });
    return;
  } catch (error: any) {
    console.error('Error in updateBadge:', error);
    if (error.name === 'ZodError') {
        res.status(400).json({ message: 'Validation error', details: error.errors });
        return;
    }
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};

export const deleteBadge = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await badgeService.deleteBadge(id);

    res.status(200).json({
      message: 'Badge deleted successfully',
    });
    return;
  } catch (error) {
    console.error('Error in deleteBadge:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};
