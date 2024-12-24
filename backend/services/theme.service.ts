import { PrismaClient, Prisma } from '@prisma/client';
import { CreateThemeInput, UpdateThemeInput } from '../schemas/theme.schema';

const prisma = new PrismaClient();

export const createTheme = async (data: CreateThemeInput) => {
  const customSettings = data.customSettings || Prisma.JsonNull;

  return await prisma.theme.create({
    data: {
      ...data,
      customSettings, 
    },
  });
};

export const getThemeByUserId = async (userId: string) => {
  return await prisma.theme.findUnique({
    where: { id: userId }, 
  });
};

export const updateTheme = async (userId: string, data: UpdateThemeInput) => {
  const customSettings = data.customSettings || Prisma.JsonNull; 

  return await prisma.theme.update({
    where: { id: userId }, 
    data: {
      ...data,
      customSettings, 
    },
  });
};

export const deleteTheme = async (userId: string) => {
  return await prisma.theme.delete({
    where: { id: userId }, 
  });
};

export default {
  createTheme,
  getThemeByUserId,
  updateTheme,
  deleteTheme,
};
