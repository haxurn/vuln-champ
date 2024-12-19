import { userModel } from "../models";
import bcrypt from 'bcrypt';
import { CreateUserSchema, UpdateUserSchema, LoginUserSchema } from "../schemas/user.schema";
import { z } from 'zod';
type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;


const createUser = async (data: any) => {
    try {
        console.log('Received data:', data);  // Add this line to log the incoming request data

        const parsedData = CreateUserSchema.safeParse(data);
        if (!parsedData.success) {
            throw new Error(`Validation failed: ${parsedData.error.errors.map((e) => e.message).join(", ")}`);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        
        return await userModel.createUser(parsedData.data);
    } catch (error: any) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

const getUserById = async (id: string) => {
    try {
        return await userModel.getUserById(id);
    } catch (error: any) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
};

const updateUserById = async (id: string, data: any) => {
    try {
        const parsedData = UpdateUserSchema.safeParse(data);
        if (!parsedData.success) {
            throw new Error(`Validation failed: ${parsedData.error.errors.map((e) => e.message).join(", ")}`);
        }
        return await userModel.updateUserById(id, parsedData.data);
    } catch (error: any) {
        throw new Error(`Error updating user by ID: ${error.message}`);
    }
};

const deleteUserById = async (id: string) => {
    try {
        return await userModel.deleteUserById(id);
    } catch (error: any) {
        throw new Error(`Error deleting user by ID: ${error.message}`);
    }
};

const getAllUsers = async () => {
    try {
        return await userModel.getAllUsers();
    } catch (error: any) {
        throw new Error(`Error fetching all users: ${error.message}`);
    }
};

const loginUser = async (identifier: string, password: string) => { 
    try {
        const loginData = { identifier, password };
        const parsedData = LoginUserSchema.safeParse(loginData);
        if (!parsedData.success) {
            throw new Error(`Validation failed: ${parsedData.error.errors.map((e) => e.message).join(", ")}`);
        }

        const user = await userModel.findByUsernameOrEmail(identifier);
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return user;
    } catch (error: any) {
        throw new Error(`Error logging in: ${error.message}`);
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
