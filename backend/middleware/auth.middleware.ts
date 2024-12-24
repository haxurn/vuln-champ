import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyRefreshToken, generateAccessToken } from '../utils/jwt.utils';

interface DecodedToken {
  userId: string;
  role: string;
  username: string;
  iat: number;
  exp: number;
}

export const validateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(403).json({ message: 'Access Denied: No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as DecodedToken;
    
    // Set all required properties
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      username: decoded.username,
      iat: decoded.iat,
      exp: decoded.exp
    };
    req.userId = decoded.userId;
    req.isAdmin = decoded.role === 'admin';
    
    next();
  } catch (error) {
    const refreshToken = req.header('x-refresh-token');

    if (!refreshToken) {
      res.status(401).json({ message: 'Invalid or expired token, and no refresh token provided' });
      return;
    }

    const decodedRefreshToken = verifyRefreshToken(refreshToken) as DecodedToken;

    if (!decodedRefreshToken) {
      res.status(403).json({ message: 'Invalid or expired refresh token' });
      return;
    }

    const newAccessToken = generateAccessToken(
      decodedRefreshToken.userId,
      decodedRefreshToken.role,
      decodedRefreshToken.username
    );

    res.setHeader('x-access-token', newAccessToken);

    // Set all required properties
    req.user = {
      userId: decodedRefreshToken.userId,
      role: decodedRefreshToken.role,
      username: decodedRefreshToken.username,
      iat: decodedRefreshToken.iat,
      exp: decodedRefreshToken.exp
    };
    req.userId = decodedRefreshToken.userId;
    req.isAdmin = decodedRefreshToken.role === 'admin';

    next();
  }
};
