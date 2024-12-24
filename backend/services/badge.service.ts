// backend/services/badge.service.ts

import * as badgeModel from "../models/badge.model";
import { BadgeData } from "../schemas/badge.schema"; // Import the BadgeData type

export const createBadge = async (badgeData: BadgeData) => {
  return badgeModel.createBadge(badgeData);
};

export const getBadgesByUser = async (userId: string) => {
  return badgeModel.getBadgesByUser(userId);
};

export const getAllBadges = async () => {
  return badgeModel.getAllBadges();
};

export const updateBadge = async (id: string, badgeData: Partial<BadgeData>) => {
  return badgeModel.updateBadge(id, badgeData);
};

export const deleteBadge = async (id: string) => {
  return badgeModel.deleteBadge(id);
};
