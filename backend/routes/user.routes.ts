// backend/routes/user.routes.ts
import { Router } from 'express';
import userController from '../controllers/user.controller'; 
import { validateToken } from '../middleware/auth.middleware'; 
import { checkAdminRole } from '../middleware/role.middleware'; 

const router = Router();

router.post('/create', userController.createUser);

router.get('/get/:id', validateToken, userController.getUserById);

router.get('/all', validateToken, checkAdminRole, userController.getAllUsers);

router.put('/update/:id', validateToken, userController.updateUserById);

router.delete('/delete/:id', validateToken, checkAdminRole, userController.deleteUserById);

router.post('/login', userController.loginUser);

export default router;
