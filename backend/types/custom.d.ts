// backend/types/custom.d.ts

import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
        username: string;
      } & JwtPayload;
      userId?: string;
      isAdmin?: boolean;
    }
  }
}
