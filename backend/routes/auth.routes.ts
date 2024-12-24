import express from 'express';
import authController from '../controllers/auth.controller'; // Import the controller

const router = express.Router();


router.post('/token', authController.refreshToken);

export default router;