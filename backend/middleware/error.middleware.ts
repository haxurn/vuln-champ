// backend/middleware/error.middleware.ts
import { Request, Response, NextFunction } from 'express';


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error stack:', err.stack);  

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',  
    details: err.details || err.stack,  
  });
};
