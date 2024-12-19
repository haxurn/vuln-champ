import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { verifyRefreshToken, generateAccessToken } from '../utils/auth.utils'; // Import your utility functions

export const validateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
      res.status(403).send('Access Denied');
      return 
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;

    req.user = decoded;  
    next();  
  } catch (error) {
    const refreshToken = req.header('x-refresh-token');  

    if (!refreshToken) {
        res.status(401).send('Invalid or expired token, and no refresh token provided');
        return 
    }

    const decodedRefreshToken = verifyRefreshToken(refreshToken);

    if (!decodedRefreshToken) {
        res.status(403).send('Invalid or expired refresh token');
        return
    }

    const newAccessToken = generateAccessToken(decodedRefreshToken.userId, decodedRefreshToken.role, decodedRefreshToken.username);

    res.setHeader('x-access-token', newAccessToken);

    req.user = decodedRefreshToken;
    next();
  }
};
