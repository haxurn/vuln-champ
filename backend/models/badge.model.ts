// backend/models/badge.model.ts
import { prisma } from "../config/db.config";
import { BadgeData } from "../schemas/badge.schema";

export const createBadge = async (badgeData: BadgeData) => {
  return prisma.badge.create({
    data: badgeData,
  });
};

export const getBadgesByUser = async (userId: string) => {
  return prisma.badge.findMany({
    where: {
      userId,
    },
  });
};


export const getAllBadges = async () => {
  return prisma.badge.findMany();
};

export const updateBadge = async (id: string, badgeData: Partial<BadgeData>) => {
  return prisma.badge.update({
    where: { id },
    data: badgeData,
  });
};


export const deleteBadge = async (id: string) => {
  return prisma.badge.delete({
    where: { id },
  });
};
