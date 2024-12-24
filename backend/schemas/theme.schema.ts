import { z } from 'zod';

// Schema for creating a theme
export const createThemeSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  mode: z.enum(['light', 'dark', 'system'], { errorMap: () => ({ message: "Invalid mode" }) }),
  customSettings: z.object({
    fontSize: z.number().optional(),
    fontFamily: z.string().optional(),
    backgroundColor: z.string().optional(),
  }).optional(),  
});


export const updateThemeSchema = z.object({
  mode: z.enum(['light', 'dark', 'system'], { errorMap: () => ({ message: "Invalid mode" }) }).optional(),
  customSettings: z.object({
    fontSize: z.number().optional(),
    fontFamily: z.string().optional(),
    backgroundColor: z.string().optional(),
  }).optional(),  
});

export const themeResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  mode: z.enum(['light', 'dark', 'system']),
  customSettings: z.object({
    fontSize: z.number().optional(),
    fontFamily: z.string().optional(),
    backgroundColor: z.string().optional(),
  }).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CreateThemeInput = z.infer<typeof createThemeSchema>;
export type UpdateThemeInput = z.infer<typeof updateThemeSchema>;
export type ThemeResponse = z.infer<typeof themeResponseSchema>;
