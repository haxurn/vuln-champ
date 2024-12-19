// backend/controllers/auth.controller.ts

import { Request, Response } from 'express';
import { verifyRefreshToken, generateAccessToken } from '../utils/auth.utils';

const refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(400).json({ message: 'Refresh token required' });
            return;
        }

        const decoded = verifyRefreshToken(refreshToken);
        if (!decoded) {
            res.status(403).json({ message: 'Invalid or expired refresh token' });
            return
        }

        const newAccessToken = generateAccessToken(decoded.userId, decoded.role, decoded.username);
        
        res.status(200).json({
            accessToken: newAccessToken,
        });
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ message: error.message || 'Error refreshing token' });
    }
};

export default {
    refreshToken,
};
