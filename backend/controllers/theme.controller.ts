import { Request, Response } from 'express';
import { createThemeSchema, updateThemeSchema } from '../schemas/theme.schema'; 
import themeService from '../services/theme.service';  
import { z } from 'zod';

export const createTheme = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = createThemeSchema.parse(req.body);
    
    const theme = await themeService.createTheme(validatedData);

    res.status(201).json(theme);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation failed', errors: error.errors });
        return;
    }
    res.status(500).json({ message: 'Error creating theme', error: error.message });
  }
};

export const getThemeByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const theme = await themeService.getThemeByUserId(userId);

    if (!theme) {
        res.status(404).json({ message: 'Theme not found' });
        return;
    }

    res.status(200).json(theme);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching theme', error: error.message });
  }
};

export const updateTheme = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const themeData = req.body;

    const validatedData = updateThemeSchema.parse(themeData);

    const updatedTheme = await themeService.updateTheme(userId, validatedData);

    if (!updatedTheme) {
        res.status(404).json({ message: 'Theme not found' });
        return;
    }

    res.status(200).json(updatedTheme);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation failed', errors: error.errors });
      return;
    }
    res.status(500).json({ message: 'Error updating theme', error: error.message });
  }
};
