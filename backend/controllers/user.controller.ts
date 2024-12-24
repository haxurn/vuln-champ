import { Request, Response } from 'express';
import userService from '../services/user.service';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils';
import { successResponse, errorResponse } from '../utils/response.util';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { UpdateUserSchema } from '../schemas/user.schema';

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password, role, email, name } = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userData = { username, password: hashedPassword, role, email, name };
        const newUser = await userService.createUser(userData);

        const accessToken = generateAccessToken(newUser.id, newUser.role, newUser.username);
        const refreshToken = generateRefreshToken(newUser.id);

        successResponse(res, {
            user: {
                id: newUser.id,
                username: newUser.username,
                role: newUser.role,
            },
            tokens: {
                accessToken,
                refreshToken,
            },
        }, 'User created successfully');
    } catch (error: any) {
        console.error(error);
        errorResponse(res, error.message || 'An error occurred while creating the user');
    }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        console.log('Authenticated user ID:', req.user?.userId);

        const user = await userService.getUserById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error: any) {
        console.error(error);
        res.status(400).json({
            message: error.message || 'An error occurred while fetching the user',
        });
    }
};

const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        const loggedInUserId = req.user?.userId;

        // Authorization check: user can only update their own profile or need admin privileges
        if (loggedInUserId !== userId && req.user?.role !== 'admin') {
            res.status(403).json({
                message: 'Forbidden: You can only update your own profile or you need admin privileges',
            });
            return;
        }

        // Validate the incoming updateData using Zod
        UpdateUserSchema.parse(updateData); // If invalid, it will throw an error

        // Handle password hashing if present
        if (updateData.password) {
            const saltRounds = 10;
            updateData.password = await bcrypt.hash(updateData.password, saltRounds);
        }

        // Call the service to update the user data
        const updatedUser = await userService.updateUserById(userId, updateData);

        successResponse(res, {
            message: 'User updated successfully',
            user: updatedUser,
        }, 'User updated successfully');
    } catch (error: any) {
        console.error(error);

        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            errorResponse(res, `Validation failed: ${error.errors.map(e => e.message).join(', ')}`);
        } else {
            errorResponse(res, error.message || 'An error occurred while updating the user');
        }
    }
};

const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        await userService.deleteUserById(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
        console.error(error);
        res.status(400).json({
            message: error.message || 'An error occurred while deleting the user',
        });
    }
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        console.error(error);
        res.status(400).json({
            message: error.message || 'An error occurred while fetching users',
        });
    }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { identifier, password } = req.body;

        const user = await userService.loginUser(identifier, password);
        
        const accessToken = generateAccessToken(user.id, user.role, user.username);
        const refreshToken = generateRefreshToken(user.id);
        
        successResponse(res, {
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
            },
            tokens: {
                accessToken,
                refreshToken,
            }
        }, 'Login successful');
    } catch (error: unknown) {
        console.error(error);

        if (error instanceof Error) {
            errorResponse(res, error.message || 'An error occurred during login');
        } else {
            errorResponse(res, 'An unknown error occurred during login');
        }
    }
};

export default {
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    getAllUsers,
    loginUser,
};
