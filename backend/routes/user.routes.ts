import { Router } from 'express';
import userController from '../controllers/user.controller'; 
import { validateToken } from '../middleware/auth.middleware'; 
import { checkAdminRole } from '../middleware/role.middleware'; 
import upload from '../utils/upload.util';  

const router = Router();

router.post('/create', upload.single('avatar'), userController.createUser);

router.get('/get/:id', validateToken, userController.getUserById);

router.get('/all', validateToken, userController.getAllUsers);

router.patch('/update/:id', upload.single('avatar'), validateToken, userController.updateUserById);


router.delete('/delete/:id', validateToken, checkAdminRole, userController.deleteUserById);

router.post('/login', userController.loginUser);

export default router;
