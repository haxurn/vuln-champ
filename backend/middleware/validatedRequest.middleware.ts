import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction): void => {  // Ensure void return type
    try {
      schema.parse(req.body);  // Validate request body
      next();  // Proceed to the next middleware/controller
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: error.errors.map(err => ({
            message: err.message,
            path: err.path.join('.'),
          })),
        });
        return;
      }
      res.status(500).json({ error: 'Unexpected error during validation' });
      return;
    }
  };
};
