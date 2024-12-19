import express from 'express';
import authController from '../controllers/auth.controller'; // Import the controller

const router = express.Router();

/**
 * Route for refreshing the access token using the refresh token.
 */
router.post('/refresh-token', authController.refreshToken);

export default router;