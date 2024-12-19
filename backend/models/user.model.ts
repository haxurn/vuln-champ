import { prisma } from "../config/db.config";
import { CreateUserSchema, UpdateUserSchema, LoginUserSchema } from "../schemas/user.schema";
import { z } from 'zod';

type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;


const createUser = async (data: CreateUserSchemaType) => {
    try {
        return await prisma.users.create({
            data,
        });
    } catch (error: any) {
        if (error.code === 'P2002') {
            throw new Error(`A user with this ${error.meta.target} already exists.`);
        }

        throw new Error('An unexpected error occurred while creating the user.');
    }
};

const getUserById = async (id: string) => {
  return await prisma.users.findUnique({
    where: { id },
    include: {
      vulnerabilities: true,
      leaderboard: true,
      notification: true,
      theme: true,
    },
  });
};


const getAllUsers = async () => {
  return await prisma.users.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
      points: true,
      badges: true,
      createdAt: true,
      updatedAt: true,
      },
  });
};


const updateUserById = async (id: string, data: UpdateUserSchemaType) => {
  return await prisma.users.update({
    where: { id },
    data,
  });
};


const deleteUserById = async (id: string) => {
  return await prisma.users.delete({
    where: { id },
  });
};


const findByUsernameOrEmail = async (identifier: string) => { 
  return await prisma.users.findFirst({
    where: {
      OR: [{ username: identifier }, { email: identifier }],
    },
  });
};

export default {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  findByUsernameOrEmail,
};
