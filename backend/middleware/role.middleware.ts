import { Request, Response, NextFunction } from 'express';

export const checkAdminRole = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user;
  console.log('User in checkAdminRole:', user); 

  if (!user) {
    res.status(400).json({ message: 'No user data found in request.' }); 
    return 
  }

  if (user.role !== 'admin') {
    res.status(403).json({ 
      message: 'Access denied. You do not have permission to perform this action.',
      userRole: user.role 
    }); 
    return;
  }

  next(); 
};

export const checkRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;
    console.log('User in checkRole:', user); 

    if (!user) {
      res.status(400).json({ message: 'No user data found in request.' }); 
      return
    }

    if (user.role !== role) {
      res.status(403).json({ 
        message: `Access denied. You must be a ${role} to perform this action.`,
        userRole: user.role 
      }); 
      return;
    }

    next(); 
  };
};
