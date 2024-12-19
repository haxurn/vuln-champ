// backend/middleware/role.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const checkAdminRole = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user || user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied. You do not have permission to perform this action.' });
      return;
  }

  next();
};

export const checkRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || user.role !== role) {
        res.status(403).json({ message: `Access denied. You must be a ${role} to perform this action.` });
        return;
    }

    next();
  };
};
