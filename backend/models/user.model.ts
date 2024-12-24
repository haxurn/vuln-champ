import { prisma } from "../config/db.config";
import { CreateUserSchema, UpdateUserSchema, LoginUserSchema } from "../schemas/user.schema";
import { z } from 'zod';

type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;

// Create a user
const createUser = async (data: CreateUserSchemaType) => {
    try {
        return await prisma.user.create({
            data: {
                ...data,
                badges: data.badges?.length
                    ? {
                        connect: data.badges.map(badgeId => ({ id: badgeId }))
                    }
                    : undefined
            },
        });
    } catch (error: any) {
        if (error.code === 'P2002') {
            throw new Error(`A user with this ${error.meta.target} already exists.`);
        }

        throw new Error('An unexpected error occurred while creating the user.');
    }
};

const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      vulnerabilities: true,
      leaderboard: true,
      notifications: true, 
      theme: true,
    },
  });
};

const getAllUsers = async () => {
  return await prisma.user.findMany({
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
  return await prisma.user.update({
    where: { id },
    data: {
      ...data,
      badges: data.badges
        ? {
            update: data.badges.map(badgeId => ({
              where: { id: badgeId },
              data: { badge: { connect: { id: badgeId } } }
            }))
          }
        : undefined,
    },
  });
};

// Delete user by ID
const deleteUserById = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  });
};

// Find user by username or email
const findByUsernameOrEmail = async (identifier: string) => {
  return await prisma.user.findFirst({
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
