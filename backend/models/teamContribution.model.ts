// backend/models/teamContribution.model.ts

import { prisma } from "../config/db.config";

export const TeamContribution = prisma.teamContribution;

export default TeamContribution;