import express from 'express';
import * as themeController from '../controllers/theme.controller';
import { validateToken } from '../middleware/auth.middleware'; 

const router = express.Router();


router.use(validateToken);

router.post('/', themeController.createTheme);


router.patch('/:userId', themeController.updateTheme);


router.get('/:userId', themeController.getThemeByUserId); 

export default router;
